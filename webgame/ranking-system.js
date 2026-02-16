// ==================== 랭킹 시스템 ====================
const RankingSystem = (function() {
    'use strict';

    // 판매 랭킹 조회
    function getSalesRanking(limit = 10) {
        const users = DeviceAuth.getAllUsers();
        const userList = Object.values(users).filter(u => !u.isAI);
        
        // 판매 횟수로 정렬
        const ranking = userList.map(user => {
            const salesCount = (user.salesHistory || []).length;
            const totalRevenue = (user.salesHistory || []).reduce((sum, sale) => sum + sale.price, 0);
            
            return {
                username: user.username,
                salesCount: salesCount,
                totalRevenue: totalRevenue,
                productsCount: (user.products || []).length,
                gold: user.gold
            };
        }).sort((a, b) => b.salesCount - a.salesCount);
        
        return ranking.slice(0, limit);
    }

    // 수익 랭킹 조회
    function getRevenueRanking(limit = 10) {
        const users = DeviceAuth.getAllUsers();
        const userList = Object.values(users).filter(u => !u.isAI);
        
        // 수익으로 정렬
        const ranking = userList.map(user => {
            const totalRevenue = (user.salesHistory || []).reduce((sum, sale) => sum + sale.price, 0);
            
            return {
                username: user.username,
                totalRevenue: totalRevenue,
                salesCount: (user.salesHistory || []).length,
                gold: user.gold
            };
        }).sort((a, b) => b.totalRevenue - a.totalRevenue);
        
        return ranking.slice(0, limit);
    }

    // 골드 랭킹 조회
    function getGoldRanking(limit = 10) {
        const users = DeviceAuth.getAllUsers();
        const userList = Object.values(users).filter(u => !u.isAI);
        
        // 골드로 정렬
        const ranking = userList.map(user => ({
            username: user.username,
            gold: user.gold,
            salesCount: (user.salesHistory || []).length,
            totalRevenue: (user.salesHistory || []).reduce((sum, sale) => sum + sale.price, 0)
        })).sort((a, b) => b.gold - a.gold);
        
        return ranking.slice(0, limit);
    }

    // 내 순위 조회
    function getMyRank(username, type = 'sales') {
        let ranking;
        
        if (type === 'sales') {
            ranking = getSalesRanking(1000);
        } else if (type === 'revenue') {
            ranking = getRevenueRanking(1000);
        } else if (type === 'gold') {
            ranking = getGoldRanking(1000);
        }
        
        const myRank = ranking.findIndex(r => r.username === username);
        return myRank === -1 ? null : myRank + 1;
    }

    // Public API
    return {
        getSalesRanking,
        getRevenueRanking,
        getGoldRanking,
        getMyRank
    };
})();

console.log('✅ RankingSystem 로드 완료');
