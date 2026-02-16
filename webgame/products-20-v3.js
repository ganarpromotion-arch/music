// ==================== 기본 상품 20개 V3 ====================
const PRODUCTS_20 = [
    // ===== 디저트 (10개) =====
    {
        id: 1,
        name: '딸기 케이크',
        category: 'dessert',
        emoji: '🍰',
        sellPrice: 200,
        ingredients: [
            { id: 'ing_strawberry', name: '딸기', amount: 10, price: 30, emoji: '🍓' },
            { id: 'ing_cream', name: '생크림', amount: 2, price: 50, emoji: '🥛' },
            { id: 'ing_flour', name: '밀가루', amount: 3, price: 15, emoji: '🌾' },
            { id: 'ing_sugar', name: '설탕', amount: 2, price: 10, emoji: '🍬' },
            { id: 'ing_egg', name: '계란', amount: 3, price: 15, emoji: '🥚' }
        ]
    },
    {
        id: 2,
        name: '초콜릿 케이크',
        category: 'dessert',
        emoji: '🍫',
        sellPrice: 220,
        ingredients: [
            { id: 'ing_chocolate', name: '초콜릿', amount: 2, price: 40, emoji: '🍫' },
            { id: 'ing_flour', name: '밀가루', amount: 3, price: 15, emoji: '🌾' },
            { id: 'ing_sugar', name: '설탕', amount: 2, price: 10, emoji: '🍬' },
            { id: 'ing_egg', name: '계란', amount: 4, price: 20, emoji: '🥚' },
            { id: 'ing_butter', name: '버터', amount: 2, price: 25, emoji: '🧈' }
        ]
    },
    {
        id: 3,
        name: '마카롱',
        category: 'dessert',
        emoji: '🎨',
        sellPrice: 180,
        ingredients: [
            { id: 'ing_almond', name: '아몬드가루', amount: 2, price: 35, emoji: '🌰' },
            { id: 'ing_sugar', name: '설탕', amount: 3, price: 10, emoji: '🍬' },
            { id: 'ing_egg_white', name: '계란 흰자', amount: 3, price: 15, emoji: '🥚' }
        ]
    },
    {
        id: 4,
        name: '치즈케이크',
        category: 'dessert',
        emoji: '🧀',
        sellPrice: 250,
        ingredients: [
            { id: 'ing_cream_cheese', name: '크림치즈', amount: 3, price: 60, emoji: '🧀' },
            { id: 'ing_sugar', name: '설탕', amount: 2, price: 10, emoji: '🍬' },
            { id: 'ing_egg', name: '계란', amount: 3, price: 15, emoji: '🥚' }
        ]
    },
    {
        id: 5,
        name: '티라미수',
        category: 'dessert',
        emoji: '☕',
        sellPrice: 260,
        ingredients: [
            { id: 'ing_mascarpone', name: '마스카포네', amount: 2, price: 55, emoji: '🧀' },
            { id: 'ing_espresso', name: '에스프레소', amount: 1, price: 20, emoji: '☕' },
            { id: 'ing_sugar', name: '설탕', amount: 2, price: 10, emoji: '🍬' }
        ]
    },
    {
        id: 6,
        name: '브라우니',
        category: 'dessert',
        emoji: '🟫',
        sellPrice: 150,
        ingredients: [
            { id: 'ing_chocolate', name: '초콜릿', amount: 2, price: 40, emoji: '🍫' },
            { id: 'ing_flour', name: '밀가루', amount: 2, price: 15, emoji: '🌾' },
            { id: 'ing_butter', name: '버터', amount: 2, price: 25, emoji: '🧈' },
            { id: 'ing_egg', name: '계란', amount: 2, price: 10, emoji: '🥚' }
        ]
    },
    {
        id: 7,
        name: '쿠키',
        category: 'dessert',
        emoji: '🍪',
        sellPrice: 80,
        ingredients: [
            { id: 'ing_flour', name: '밀가루', amount: 2, price: 15, emoji: '🌾' },
            { id: 'ing_butter', name: '버터', amount: 1, price: 25, emoji: '🧈' },
            { id: 'ing_sugar', name: '설탕', amount: 1, price: 10, emoji: '🍬' }
        ]
    },
    {
        id: 8,
        name: '푸딩',
        category: 'dessert',
        emoji: '🍮',
        sellPrice: 120,
        ingredients: [
            { id: 'ing_milk', name: '우유', amount: 2, price: 20, emoji: '🥛' },
            { id: 'ing_sugar', name: '설탕', amount: 2, price: 10, emoji: '🍬' },
            { id: 'ing_egg', name: '계란', amount: 3, price: 15, emoji: '🥚' }
        ]
    },
    {
        id: 9,
        name: '도넛',
        category: 'dessert',
        emoji: '🍩',
        sellPrice: 100,
        ingredients: [
            { id: 'ing_flour', name: '밀가루', amount: 2, price: 15, emoji: '🌾' },
            { id: 'ing_sugar', name: '설탕', amount: 2, price: 10, emoji: '🍬' },
            { id: 'ing_oil', name: '식용유', amount: 1, price: 20, emoji: '🫗' }
        ]
    },
    {
        id: 10,
        name: '와플',
        category: 'dessert',
        emoji: '🧇',
        sellPrice: 140,
        ingredients: [
            { id: 'ing_flour', name: '밀가루', amount: 2, price: 15, emoji: '🌾' },
            { id: 'ing_egg', name: '계란', amount: 2, price: 10, emoji: '🥚' },
            { id: 'ing_milk', name: '우유', amount: 1, price: 20, emoji: '🥛' }
        ]
    },
    
    // ===== 국밥 (2개) =====
    {
        id: 11,
        name: '소고기 국밥',
        category: 'korean',
        emoji: '🍲',
        sellPrice: 180,
        ingredients: [
            { id: 'ing_beef', name: '소고기', amount: 3, price: 80, emoji: '🥩' },
            { id: 'ing_green_onion', name: '대파', amount: 2, price: 5, emoji: '🧅' },
            { id: 'ing_garlic', name: '마늘', amount: 5, price: 3, emoji: '🧄' },
            { id: 'ing_rice', name: '밥', amount: 2, price: 10, emoji: '🍚' }
        ]
    },
    {
        id: 12,
        name: '순대 국밥',
        category: 'korean',
        emoji: '🥘',
        sellPrice: 160,
        ingredients: [
            { id: 'ing_sundae', name: '순대', amount: 2, price: 40, emoji: '🍖' },
            { id: 'ing_green_onion', name: '대파', amount: 2, price: 5, emoji: '🧅' },
            { id: 'ing_rice', name: '밥', amount: 2, price: 10, emoji: '🍚' }
        ]
    },
    
    // ===== 파스타 (2개) =====
    {
        id: 13,
        name: '까르보나라',
        category: 'pasta',
        emoji: '🍝',
        sellPrice: 190,
        ingredients: [
            { id: 'ing_spaghetti', name: '스파게티면', amount: 2, price: 15, emoji: '🍝' },
            { id: 'ing_bacon', name: '베이컨', amount: 2, price: 25, emoji: '🥓' },
            { id: 'ing_egg', name: '계란', amount: 2, price: 10, emoji: '🥚' },
            { id: 'ing_cheese', name: '치즈', amount: 1, price: 30, emoji: '🧀' }
        ]
    },
    {
        id: 14,
        name: '토마토 파스타',
        category: 'pasta',
        emoji: '🍅',
        sellPrice: 170,
        ingredients: [
            { id: 'ing_spaghetti', name: '스파게티면', amount: 2, price: 15, emoji: '🍝' },
            { id: 'ing_tomato', name: '토마토', amount: 3, price: 10, emoji: '🍅' },
            { id: 'ing_garlic', name: '마늘', amount: 3, price: 2, emoji: '🧄' },
            { id: 'ing_oil', name: '올리브유', amount: 1, price: 10, emoji: '🫒' }
        ]
    },
    
    // ===== 치킨 (2개) =====
    {
        id: 15,
        name: '후라이드 치킨',
        category: 'chicken',
        emoji: '🍗',
        sellPrice: 220,
        ingredients: [
            { id: 'ing_chicken', name: '닭고기', amount: 5, price: 60, emoji: '🍗' },
            { id: 'ing_flour', name: '튀김가루', amount: 2, price: 15, emoji: '🌾' },
            { id: 'ing_oil', name: '식용유', amount: 2, price: 20, emoji: '🫗' }
        ]
    },
    {
        id: 16,
        name: '양념 치킨',
        category: 'chicken',
        emoji: '🍗',
        sellPrice: 240,
        ingredients: [
            { id: 'ing_chicken', name: '닭고기', amount: 5, price: 60, emoji: '🍗' },
            { id: 'ing_flour', name: '튀김가루', amount: 2, price: 15, emoji: '🌾' },
            { id: 'ing_sauce', name: '양념소스', amount: 2, price: 20, emoji: '🌶️' }
        ]
    },
    
    // ===== 피자 (2개) =====
    {
        id: 17,
        name: '페퍼로니 피자',
        category: 'pizza',
        emoji: '🍕',
        sellPrice: 250,
        ingredients: [
            { id: 'ing_dough', name: '피자 도우', amount: 1, price: 20, emoji: '🫓' },
            { id: 'ing_tomato', name: '토마토 소스', amount: 2, price: 15, emoji: '🍅' },
            { id: 'ing_cheese', name: '모짜렐라 치즈', amount: 2, price: 40, emoji: '🧀' },
            { id: 'ing_pepperoni', name: '페퍼로니', amount: 2, price: 30, emoji: '🥩' }
        ]
    },
    {
        id: 18,
        name: '불고기 피자',
        category: 'pizza',
        emoji: '🍕',
        sellPrice: 270,
        ingredients: [
            { id: 'ing_dough', name: '피자 도우', amount: 1, price: 20, emoji: '🫓' },
            { id: 'ing_tomato', name: '토마토 소스', amount: 2, price: 15, emoji: '🍅' },
            { id: 'ing_cheese', name: '모짜렐라 치즈', amount: 2, price: 40, emoji: '🧀' },
            { id: 'ing_bulgogi', name: '불고기', amount: 2, price: 45, emoji: '🥩' }
        ]
    },
    
    // ===== 버거 (2개) =====
    {
        id: 19,
        name: '치즈버거',
        category: 'burger',
        emoji: '🍔',
        sellPrice: 140,
        ingredients: [
            { id: 'ing_bun', name: '버거 번', amount: 1, price: 8, emoji: '🍞' },
            { id: 'ing_patty', name: '패티', amount: 1, price: 25, emoji: '🥩' },
            { id: 'ing_cheese', name: '치즈', amount: 1, price: 5, emoji: '🧀' },
            { id: 'ing_lettuce', name: '양상추', amount: 1, price: 3, emoji: '🥬' }
        ]
    },
    {
        id: 20,
        name: '불고기 버거',
        category: 'burger',
        emoji: '🍔',
        sellPrice: 160,
        ingredients: [
            { id: 'ing_bun', name: '버거 번', amount: 1, price: 8, emoji: '🍞' },
            { id: 'ing_bulgogi', name: '불고기', amount: 1, price: 35, emoji: '🥩' },
            { id: 'ing_lettuce', name: '양상추', amount: 1, price: 3, emoji: '🥬' },
            { id: 'ing_sauce', name: '소스', amount: 1, price: 5, emoji: '🥫' }
        ]
    }
];
