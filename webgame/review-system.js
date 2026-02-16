// ==================== 리뷰 시스템 (식당 리뷰 / 긍정 템플릿 10개) ====================
const ReviewSystem = (function() {
    'use strict';

    // ✅ 무조건 좋은 리뷰 10개(클릭/랜덤 공용)
    const POSITIVE_REVIEW_TEMPLATES = [
        { rating: 5, text: '국물 맛이 진하고 재료가 신선해요. 또 올게요!' },
        { rating: 5, text: '양도 푸짐하고 간이 딱 좋아요. 가족이 다 좋아했어요.' },
        { rating: 5, text: '매장이 깔끔하고 친절해서 기분 좋게 먹었습니다.' },
        { rating: 5, text: '맛이 일정해서 믿고 먹는 집이에요. 강추!' },
        { rating: 5, text: '포장도 깔끔하고 집에서 먹어도 맛있네요.' },
        { rating: 5, text: '진짜 중독되는 맛… 다음엔 친구 데려올게요!' },
        { rating: 5, text: '가격 대비 퀄리티 최고! 재방문 확정입니다.' },
        { rating: 5, text: '특별한 날에 먹기 좋아요. 만족도 100%!' },
        { rating: 5, text: '처음 방문인데 대만족. 메뉴 전부 도장깨기 하고 싶어요.' },
        { rating: 5, text: '한입 먹자마자 “여기다” 싶었어요. 또 올게요!' }
    ];

    function _getUser(key) {
        const users = (typeof DeviceAuth !== 'undefined' && DeviceAuth.getAllUsers) ? DeviceAuth.getAllUsers() : {};
        return users[key] || null;
    }

    function _saveUser(key, user) {
        if (typeof DeviceAuth !== 'undefined' && DeviceAuth.saveUser) {
            DeviceAuth.saveUser(key, user);
        } else {
            // fallback: localStorage에 users 저장 구조가 있는 경우를 대비
            try {
                const all = JSON.parse(localStorage.getItem('deviceAuth_users') || '{}');
                all[key] = user;
                localStorage.setItem('deviceAuth_users', JSON.stringify(all));
            } catch(e) {}
        }
    }

    // ✅ 식당(계정) 리뷰 추가: templateIndex(0~9)로 클릭해서 넣는 용도
    function addRestaurantReview(sellerKey, templateIndex, reviewerName) {
        const seller = _getUser(sellerKey);
        if (!seller) return null;

        if (!seller.restaurantReviews) seller.restaurantReviews = [];

        const t = POSITIVE_REVIEW_TEMPLATES[Math.max(0, Math.min(POSITIVE_REVIEW_TEMPLATES.length-1, templateIndex))];

        const review = {
            id: Date.now() + Math.random(),
            rating: t.rating,
            text: t.text,
            reviewerName: reviewerName || '손님',
            createdAt: Date.now()
        };

        seller.restaurantReviews.push(review);
        _saveUser(sellerKey, seller);
        return review;
    }

    // ✅ 랜덤으로 좋은 리뷰 추가(기존 AI 구매 흐름에서 호출 가능)
    function addRandomPositiveRestaurantReview(sellerKey, reviewerName) {
        const idx = Math.floor(Math.random() * POSITIVE_REVIEW_TEMPLATES.length);
        return addRestaurantReview(sellerKey, idx, reviewerName);
    }

    function getRestaurantReviews(sellerKey) {
        const seller = _getUser(sellerKey);
        if (!seller) return [];
        return seller.restaurantReviews || [];
    }

    function getAverageRestaurantRating(sellerKey) {
        const reviews = getRestaurantReviews(sellerKey);
        if (!reviews.length) return 0;
        const sum = reviews.reduce((a, r) => a + (r.rating || 0), 0);
        return (sum / reviews.length).toFixed(1);
    }

    return {
        POSITIVE_REVIEW_TEMPLATES,
        addRestaurantReview,
        addRandomPositiveRestaurantReview,
        getRestaurantReviews,
        getAverageRestaurantRating
    };
})();

console.log('✅ ReviewSystem(식당 리뷰) 로드 완료');
