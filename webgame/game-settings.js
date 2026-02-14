// ==================== 게임 설정 관리 ====================
const GameSettings = (function() {
    'use strict';

    // ==================== 기본 설정 ====================
    const DEFAULT_SETTINGS = {
        // 게임 기본
        initialGold: 500,                    // 초기 골드
        firstShopCost: 300,                  // 첫 매장 비용
        additionalShopCost: 500,             // 추가 매장 비용
        

        // 배경음악(BGM)
        bgmEnabled: true,                 // 배경음악 사용
        bgmSourceType: 'url',             // 'url' | 'data'
        bgmUrl: '',                       // BGM URL (mp3/ogg)
        bgmDataKey: '',                   // localStorage key for uploaded file
        bgmVolume: 0.35,                  // 0~1
        // AI 설정
        aiHungerInterval: 60000,             // AI 배고픔 증가 간격 (밀리초) - 기본 1분
        aiHungerIncrement: 1,                // 배고픔 증가량 (%) - 기본 1%
        aiPurchaseInterval: 30000,           // AI 구매 시도 간격 (밀리초) - 기본 30초
        aiPurchaseChance: 0.3,               // AI 구매 시도 확률 - 기본 30%
        
        // 레시피 설정
        recipePriceMultiplier: 3,            // 적정가 계산 배율 (제작비 × N)
        
        // 문제 설정
        easyQuestionReward: 10,              // 쉬운 문제 보상
        mediumQuestionReward: 15,            // 중간 문제 보상
        hardQuestionReward: 20,              // 어려운 문제 보상
        
        // 댓글 설정
        maxCommentsPerProduct: 100,          // 상품당 최대 댓글 수
        
        // 기타
        adminPassword: '1234',              // 관리자 페이지 비밀번호 (⚠️ 데모용. 배포 시 변경)
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    // ==================== 초기화 ====================
    function init() {
        const settings = localStorage.getItem('gameSettings');
        if (!settings) {
            save(DEFAULT_SETTINGS);
            console.log('✅ 기본 설정 초기화 완료');
        }
    }

    // ==================== Get/Set ====================
    function get() {
        const settings = localStorage.getItem('gameSettings');
        return settings ? JSON.parse(settings) : DEFAULT_SETTINGS;
    }

    function save(settings) {
        settings.updatedAt = Date.now();
        localStorage.setItem('gameSettings', JSON.stringify(settings));
    }

    function set(key, value) {
        const settings = get();
        settings[key] = value;
        save(settings);
    }

    // ==================== 개별 설정 ====================
    function getInitialGold() {
        return get().initialGold;
    }

    function setInitialGold(gold) {
        set('initialGold', gold);
    }

    function getFirstShopCost() {
        return get().firstShopCost;
    }

    function setFirstShopCost(cost) {
        set('firstShopCost', cost);
    }

    function getAdditionalShopCost() {
        return get().additionalShopCost;
    }

    function setAdditionalShopCost(cost) {
        set('additionalShopCost', cost);
    }

    function getAIHungerInterval() {
        return get().aiHungerInterval;
    }

    function setAIHungerInterval(interval) {
        set('aiHungerInterval', interval);
    }

    function getAIHungerIncrement() {
        return get().aiHungerIncrement;
    }

    function setAIHungerIncrement(increment) {
        set('aiHungerIncrement', increment);
    }

    function getAIPurchaseInterval() {
        return get().aiPurchaseInterval;
    }

    function setAIPurchaseInterval(interval) {
        set('aiPurchaseInterval', interval);
    }

    function getAIPurchaseChance() {
        return get().aiPurchaseChance;
    }

    function setAIPurchaseChance(chance) {
        set('aiPurchaseChance', chance);
    }

    function getRecipePriceMultiplier() {
        return get().recipePriceMultiplier;
    }

    function setRecipePriceMultiplier(multiplier) {
        set('recipePriceMultiplier', multiplier);
    }

    function getQuestionReward(difficulty) {
        const settings = get();
        if (difficulty === 'easy') return settings.easyQuestionReward;
        if (difficulty === 'medium') return settings.mediumQuestionReward;
        if (difficulty === 'hard') return settings.hardQuestionReward;
        return settings.easyQuestionReward;
    }

    function setQuestionReward(difficulty, reward) {
        if (difficulty === 'easy') set('easyQuestionReward', reward);
        if (difficulty === 'medium') set('mediumQuestionReward', reward);
        if (difficulty === 'hard') set('hardQuestionReward', reward);
    }

    function getMaxCommentsPerProduct() {
        return get().maxCommentsPerProduct;
    }

    function getAdminPassword() {
        return get('adminPassword');
    }


    function setMaxCommentsPerProduct(max) {
        set('maxCommentsPerProduct', max);
    }

    // ==================== 관리 ====================
    function resetToDefault() {
        save(DEFAULT_SETTINGS);
        console.log('✅ 기본 설정으로 초기화됨');
    }

    function exportSettings() {
        return JSON.stringify(get(), null, 2);
    }

    function importSettings(jsonString) {
        try {
            const settings = JSON.parse(jsonString);
            save(settings);
            return { success: true, message: '설정 가져오기 성공' };
        } catch (e) {
            return { success: false, message: '잘못된 JSON 형식: ' + e.message };
        }
    }

    // ==================== Public API ====================
    
    // ==================== 배경음악(BGM) ====================
    function getBgmEnabled() { return get().bgmEnabled !== false; }
    function setBgmEnabled(v) { set('bgmEnabled', !!v); }

    function getBgmSourceType() { return get().bgmSourceType || 'url'; }
    function setBgmSourceType(v) { set('bgmSourceType', v === 'data' ? 'data' : 'url'); }

    function getBgmUrl() { return get().bgmUrl || ''; }
    function setBgmUrl(v) { set('bgmUrl', String(v || '')); }

    function getBgmDataKey() { return get().bgmDataKey || ''; }
    function setBgmDataKey(v) { set('bgmDataKey', String(v || '')); }

    function getBgmVolume() {
        const x = parseFloat(get().bgmVolume);
        if (Number.isFinite(x)) return Math.min(1, Math.max(0, x));
        return 0.35;
    }
    function setBgmVolume(v) {
        const x = parseFloat(v);
        set('bgmVolume', Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : 0.35);
    }

    // localStorage에 저장된 업로드 BGM(dataURL) 읽기
    function getBgmDataUrl() {
        const key = getBgmDataKey();
        if (!key) return '';
        try { return localStorage.getItem(key) || ''; } catch(e) { return ''; }
    }

    // 현재 BGM 소스 URL 반환 (data 또는 url)
    function getBgmResolvedSrc() {
        const t = getBgmSourceType();
        if (t === 'data') return getBgmDataUrl();
        return getBgmUrl();
    }

return {
        init,
        get,
        save,
        set,

        // 배경음악(BGM)
        getBgmEnabled,
        setBgmEnabled,
        getBgmSourceType,
        setBgmSourceType,
        getBgmUrl,
        setBgmUrl,
        getBgmDataKey,
        setBgmDataKey,
        getBgmVolume,
        setBgmVolume,
        getBgmResolvedSrc,

        // 골드
        getInitialGold,
        setInitialGold,
        getFirstShopCost,
        setFirstShopCost,
        getAdditionalShopCost,
        setAdditionalShopCost,
        
        // AI
        getAIHungerInterval,
        setAIHungerInterval,
        getAIHungerIncrement,
        setAIHungerIncrement,
        getAIPurchaseInterval,
        setAIPurchaseInterval,
        getAIPurchaseChance,
        setAIPurchaseChance,
        
        // 레시피
        getRecipePriceMultiplier,
        setRecipePriceMultiplier,
        
        // 문제
        getQuestionReward,
        setQuestionReward,
        
        // 댓글
        getMaxCommentsPerProduct,
        setMaxCommentsPerProduct,
        
        // 관리
        resetToDefault,
        exportSettings,
        importSettings
    };
})();

// 자동 초기화
GameSettings.init();
console.log('✅ GameSettings 로드 완료');
