// ==================== 스마트 AI 구매 시스템 ====================
const SmartAIBuyers = (function() {
    'use strict';

    const HUNGER_STORAGE = 'aiHunger';
    const COMMENT_STORAGE = 'shopComments';
    const MAX_COMMENTS = 100;

    // 배고픔 시스템 (1분마다 1% 증가)
    function initHunger() {
        const stored = localStorage.getItem(HUNGER_STORAGE);
        if (!stored) {
            const hunger = {};
            const users = DeviceAuth.getAllUsers();
            
            Object.keys(users).forEach(username => {
                if (users[username].isAI) {
                    hunger[username] = {
                        level: Math.floor(Math.random() * 30), // 초기 0-30%
                        lastUpdate: Date.now()
                    };
                }
            });
            
            localStorage.setItem(HUNGER_STORAGE, JSON.stringify(hunger));
        }
    }

    // 배고픔 업데이트
    function updateHunger() {
        const hunger = JSON.parse(localStorage.getItem(HUNGER_STORAGE) || '{}');
        const now = Date.now();
        
        Object.keys(hunger).forEach(username => {
            const data = hunger[username];
            const minutesPassed = Math.floor((now - data.lastUpdate) / 60000);
            
            if (minutesPassed > 0) {
                data.level = Math.min(100, data.level + minutesPassed);
                data.lastUpdate = now;
            }
        });
        
        localStorage.setItem(HUNGER_STORAGE, JSON.stringify(hunger));
        return hunger;
    }

    // 적정가격 계산 (제작비용 × 3)
    function calculateFairPrice(productId, fallbackPrice=0) {
        // ✅ 1순위: DataManager 기반 (현재 게임 데이터 구조)
        try {
            if (typeof DataManager !== 'undefined' && DataManager.calculateFairPrice) {
                const v = Number(DataManager.calculateFairPrice(productId)) || 0;
                if (v > 0) return v;
            }
        } catch (e) {}

        // ✅ 2순위: PRODUCTS_20(구버전) 호환
        try {
            if (typeof PRODUCTS_20 !== 'undefined' && Array.isArray(PRODUCTS_20)) {
                const product = PRODUCTS_20.find(p => p.id === productId);
                if (product && Array.isArray(product.ingredients)) {
                    const cost = product.ingredients.reduce((sum, ing) => {
                        const price = Number(ing.price) || 0;
                        const amount = Number(ing.amount) || 0;
                        return sum + (price * amount);
                    }, 0);
                    const fair = cost * 3;
                    if (fair > 0) return fair;
                }
            }
        } catch (e) {}

        // ✅ 최후: fallbackPrice (0이면 1로)
        const fp = Number(fallbackPrice) || 0;
        return fp > 0 ? fp : 1;
    }

    // 댓글 추가
    function addComment(sellerUsername, productId, aiName, comment) {
        const comments = JSON.parse(localStorage.getItem(COMMENT_STORAGE) || '{}');
        const key = `${sellerUsername}_${productId}`;
        
        if (!comments[key]) comments[key] = [];
        
        // 최대 100개 제한
        if (comments[key].length >= MAX_COMMENTS) {
            comments[key].shift(); // 가장 오래된 것 삭제
        }
        
        comments[key].push({
            aiName: aiName,
            comment: comment,
            timestamp: Date.now()
        });
        
        localStorage.setItem(COMMENT_STORAGE, JSON.stringify(comments));
    }

    // 댓글 가져오기
    function getComments(sellerUsername, productId) {
        const comments = JSON.parse(localStorage.getItem(COMMENT_STORAGE) || '{}');
        const key = `${sellerUsername}_${productId}`;
        return comments[key] || [];
    }

    // 구매 결정 로직
    function shouldBuy(productPrice, fairPrice, hungerLevel) {
        // ✅ fairPrice가 0/undefined면 비교 불가 → 현재 가격을 적정가로 간주
        if (!fairPrice || fairPrice <= 0) fairPrice = Math.max(1, Number(productPrice) || 1);
        const priceRatio = productPrice / fairPrice;
        
        // 배고픔이 높을수록 비싼 것도 구매
        const hungerBonus = hungerLevel / 100; // 0 ~ 1
        
        // 가격이 적정가의 80% 미만 → 항상 구매 (가성비 최고!)
        if (priceRatio < 0.8) return { buy: true, comment: '가성비 최고!' };
        
        // 가격이 적정가의 80~110% → 배고픔 50% 이상이면 구매
        if (priceRatio <= 1.1) {
            if (hungerLevel >= 50) {
                return { buy: true, comment: '좋아요!' };
            } else {
                return { buy: false, comment: '나중에 올게요' };
            }
        }
        
        // 가격이 적정가의 110~130% → 배고픔 70% 이상이면 구매
        if (priceRatio <= 1.3) {
            if (hungerLevel >= 70) {
                return { buy: true, comment: '배고파서 샀어요...' };
            } else {
                return { buy: false, comment: '조금 비싼데요?' };
            }
        }
        
        // 가격이 적정가의 130% 이상 → 배고픔 90% 이상이면 구매
        if (hungerLevel >= 90) {
            return { buy: true, comment: '너무 배고파요 ㅠㅠ' };
        } else {
            return { buy: false, comment: '너무 비싸요!' };
        }
    }

    // AI 구매 실행
    function executeAIPurchase() {
        const users = DeviceAuth.getAllUsers();
        const hunger = updateHunger();
        
        // 모든 AI 순회
        Object.keys(users).forEach(aiUsername => {
            const ai = users[aiUsername];
            if (!ai.isAI) return;
            
            const aiHunger = hunger[aiUsername]?.level || 0;
            
            // 30% 확률로 상점 방문 시도
            if (Math.random() > 0.3) return;
            
            // 랜덤 판매자 선택 (AI 제외)
            const sellers = Object.keys(users).filter(u => !users[u].isAI && users[u].products && users[u].products.length > 0);
            if (sellers.length === 0) return;
            
            const sellerUsername = sellers[Math.floor(Math.random() * sellers.length)];
            const seller = users[sellerUsername];
            
            // 랜덤 상품 선택
            const productIdx = Math.floor(Math.random() * seller.products.length);
            const product = seller.products[productIdx];
            
            // 적정가격 계산
            const fairPrice = calculateFairPrice(product.id, product.price);
            
            // 구매 결정
            const decision = shouldBuy(product.price, fairPrice, aiHunger);
            
            // 댓글 추가
            const aiName = aiUsername.replace('AI_', '');
            addComment(sellerUsername, product.id, aiName, decision.comment);
            
            console.log(`[AI] ${aiName} 방문 → ${product.name} (${product.price}G, 적정: ${fairPrice}G, 배고픔: ${aiHunger}%) → ${decision.comment}`);
            
            // 구매 실행
            if (decision.buy && ai.gold >= product.price) {
                // AI 골드 차감
                ai.gold -= product.price;
                if (!ai.stats) ai.stats = { made: 0, sold: 0, bought: 0 };
                ai.stats.bought++;
                
                // 판매자 골드 증가
                seller.gold += product.price;
                if (!seller.stats) seller.stats = { made: 0, sold: 0, bought: 0 };
                seller.stats.sold++;
                
                // 상품 제거
                seller.products.splice(productIdx, 1);
                
                // 판매 이력 기록
                if (!seller.salesHistory) seller.salesHistory = [];
                seller.salesHistory.push({
                    productId: product.id,
                    productName: product.name,
                    productEmoji: product.emoji,
                    price: product.price,
                    soldAt: Date.now(),
                    buyer: aiName
                });
                
                // 배고픔 감소 (50% 감소)
                if (hunger[aiUsername]) {
                    hunger[aiUsername].level = Math.max(0, hunger[aiUsername].level - 50);
                }
                
                // 저장
                users[aiUsername] = ai;
                users[sellerUsername] = seller;
                DeviceAuth.saveAllUsers(users);
                localStorage.setItem(HUNGER_STORAGE, JSON.stringify(hunger));
                
                // 리뷰 추가
                try {
                    if (typeof ReviewSystem !== 'undefined' && ReviewSystem.addReview) {
                        ReviewSystem.addReview(sellerUsername, product.id, aiName);
                    }
                } catch(e) { console.log('리뷰 추가 에러:', e); }
                
                console.log(`[구매 성공] ${aiName} → ${product.name} (${product.price}G)`);
                
                // 알림 표시 (현재 유저가 판매자라면)
                if (window.currentUser === sellerUsername) {
                    if (window.toast) {
                        window.toast(`🎉 ${aiName}님이 ${product.name}를 ${product.price}G에 구매했습니다!`);
                    }
                    if (window.renderAll) {
                        window.renderAll();
                    }
                }
            }
        });
    }

    // AI 구매 시작 (30초마다)
    function startAIBuying(intervalMs=30000) {
        initHunger();
        
        // 30초마다 구매 시도
        setInterval(() => {
            executeAIPurchase();
        }, Math.max(3000, Number(intervalMs)||30000));
        
        console.log('스마트 AI 구매 시스템 시작!');
    }

    // 배고픔 레벨 가져오기
    function getHungerLevel(aiUsername) {
        const hunger = updateHunger();
        return hunger[aiUsername]?.level || 0;
    }

    return {
        startAIBuying,
        getComments,
        getHungerLevel,
        calculateFairPrice
    };
})();
