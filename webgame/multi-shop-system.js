// ==================== 복수 상점 시스템 ====================
const MultiShopSystem = (function() {
    'use strict';

    function _displayUsername(username) {
        if (!username) return '';
        // userKey 형태(username__uuid)면 앞부분만
        if (username.includes('__')) username = username.split('__')[0];
        // 이전 버전에서 붙던 _nouuid 제거
        if (username.endsWith('_nouuid')) username = username.replace(/_nouuid$/, '');
        return username;
    }

    const SHOP_COST = (typeof GameSettings !== 'undefined' && GameSettings.getAdditionalShopCost) 
        ? GameSettings.getAdditionalShopCost() : 500;

    // 상점 추가
    function addShop(username, shopType) {
        const users = DeviceAuth.getAllUsers();
        const user = users[username];
        
        if (user.gold < SHOP_COST) {
            return { success: false, message: `골드 부족! (${user.gold}/${SHOP_COST}G)` };
        }
        
        // 상점 배열 초기화
        if (!user.shops) {
            user.shops = [];
            // 기존 상점을 배열로 변환
            if (user.shop) {
                user.shops.push(user.shop);
            }
        }
        
        // 이미 있는 업종인지 확인
        const exists = user.shops.some(shop => shop.type === shopType);
        if (exists) {
            return { success: false, message: '이미 운영 중인 업종입니다!' };
        }
        
        // 골드 차감
        user.gold -= SHOP_COST;
        
        // 상점 추가
        const shopNames = {};
        try {
            const types = DataManager.getShopTypes();
            types.forEach(t => { shopNames[t.id] = t.name; });
        } catch(e) {}
        
        user.shops.push({
            type: shopType,
            name: `${_displayUsername(username)}의 ${shopNames[shopType] || shopType}`,
            createdAt: Date.now()
        });
        
        // 첫 상점이면 기본 상점으로 설정
        if (!user.shop) {
            user.shop = user.shops[0];
        }
        
        users[username] = user;
        DeviceAuth.saveAllUsers(users);
        
        return { success: true, message: `${username}의 ${shopNames[shopType] || shopType} 오픈!` };
    }

    // 현재 상점 변경
    function switchShop(username, shopIndex) {
        const users = DeviceAuth.getAllUsers();
        const user = users[username];
        
        if (!user.shops || !user.shops[shopIndex]) {
            return { success: false, message: '상점을 찾을 수 없습니다' };
        }
        
        user.shop = user.shops[shopIndex];
        users[username] = user;
        DeviceAuth.saveAllUsers(users);
        
        return { success: true, message: `${user.shop.name}으로 전환!` };
    }

    // 상점 목록 가져오기
    function getShops(username) {
        const users = DeviceAuth.getAllUsers();
        const user = users[username];
        
        if (!user.shops || user.shops.length === 0) {
            return user.shop ? [user.shop] : [];
        }
        
        return user.shops;
    }

    // 운영 가능한 업종 목록
    function getAvailableTypes(username) {
        const users = DeviceAuth.getAllUsers();
        const user = users[username];
        const shops = user.shops || (user.shop ? [user.shop] : []);
        
        const allTypes = DataManager.getShopTypes().map(t => t.id);
        const ownedTypes = shops.map(s => s.type);
        
        return allTypes.filter(type => !ownedTypes.includes(type));
    }

    return {
        addShop,
        switchShop,
        getShops,
        getAvailableTypes,
        SHOP_COST
    };
})();
