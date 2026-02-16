// ==================== 확장 식당 데이터 (30개 업종) ====================
// 이 파일을 수정하여 식당/메뉴/재료를 추가할 수 있습니다
// data-manager.js 보다 먼저 로드되어야 합니다

const EXPANDED_SHOP_DATA = (function() {
    'use strict';

    // ==================== 30개 식당 종류 ====================
    const shopTypes = [
        // ── 한식 계열 ──
        { id: 'korean',    name: '한식당',       emoji: '🍚', addCost: 300 },
        { id: 'jjigae',    name: '찌개전문점',   emoji: '🍲', addCost: 300 },
        { id: 'gukbap',    name: '국밥집',       emoji: '🍜', addCost: 300 },
        { id: 'bbq',       name: '고기구이',     emoji: '🥩', addCost: 700 },
        { id: 'snack',     name: '분식집',       emoji: '🧆', addCost: 300 },
        { id: 'tteok',     name: '떡집',         emoji: '🍡', addCost: 300 },
        { id: 'porridge',  name: '죽전문점',     emoji: '🥣', addCost: 300 },
        { id: 'dosirak',   name: '도시락가게',   emoji: '🍱', addCost: 400 },
        // ── 양식 계열 ──
        { id: 'pasta',     name: '파스타전문점', emoji: '🍝', addCost: 500 },
        { id: 'pizza',     name: '피자가게',     emoji: '🍕', addCost: 700 },
        { id: 'burger',    name: '버거집',       emoji: '🍔', addCost: 700 },
        { id: 'steak',     name: '스테이크하우스', emoji: '🥩', addCost: 900 },
        { id: 'sandwich',  name: '샌드위치가게', emoji: '🥪', addCost: 400 },
        { id: 'salad',     name: '샐러드가게',   emoji: '🥗', addCost: 400 },
        // ── 치킨/튀김 ──
        { id: 'chicken',   name: '치킨집',       emoji: '🍗', addCost: 500 },
        // ── 아시안 ──
        { id: 'chinese',   name: '중식당',       emoji: '🥟', addCost: 500 },
        { id: 'japanese',  name: '일식당',       emoji: '🍣', addCost: 700 },
        { id: 'sushi',     name: '초밥집',       emoji: '🍣', addCost: 800 },
        { id: 'thai',      name: '태국음식점',   emoji: '🍜', addCost: 600 },
        { id: 'indian',    name: '인도음식점',   emoji: '🍛', addCost: 600 },
        { id: 'dimsum',    name: '딤섬전문점',   emoji: '🥟', addCost: 600 },
        { id: 'mexican',   name: '멕시코음식점', emoji: '🌮', addCost: 600 },
        // ── 해산물 ──
        { id: 'seafood',   name: '해산물집',     emoji: '🦞', addCost: 800 },
        // ── 면류 ──
        { id: 'noodle',    name: '면전문점',     emoji: '🍜', addCost: 400 },
        // ── 디저트/음료 ──
        { id: 'dessert',   name: '디저트카페',   emoji: '🍰', addCost: 300 },
        { id: 'cafe',      name: '카페',         emoji: '☕', addCost: 300 },
        { id: 'bakery',    name: '베이커리',     emoji: '🥐', addCost: 400 },
        { id: 'icecream',  name: '아이스크림가게', emoji: '🍦', addCost: 400 },
        { id: 'juice',     name: '주스가게',     emoji: '🧃', addCost: 300 },
        // ── 간편식 ──
        { id: 'hotdog',    name: '핫도그가게',   emoji: '🌭', addCost: 300 }
    ];

    // ==================== 재료 목록 (90+ 종류) ====================
    const ingredients = [
        // ── 과일 ──
        { id: 'strawberry', name: '딸기',     price: 3,  emoji: '🍓', category: 'fruit' },
        { id: 'tomato',     name: '토마토',   price: 2,  emoji: '🍅', category: 'fruit' },
        { id: 'lemon',      name: '레몬',     price: 2,  emoji: '🍋', category: 'fruit' },
        { id: 'banana',     name: '바나나',   price: 2,  emoji: '🍌', category: 'fruit' },
        { id: 'apple',      name: '사과',     price: 3,  emoji: '🍎', category: 'fruit' },
        { id: 'mango',      name: '망고',     price: 5,  emoji: '🥭', category: 'fruit' },
        { id: 'blueberry',  name: '블루베리', price: 4,  emoji: '🫐', category: 'fruit' },
        { id: 'peach',      name: '복숭아',   price: 3,  emoji: '🍑', category: 'fruit' },
        { id: 'grape',      name: '포도',     price: 4,  emoji: '🍇', category: 'fruit' },
        { id: 'orange',     name: '오렌지',   price: 3,  emoji: '🍊', category: 'fruit' },
        { id: 'pineapple',  name: '파인애플', price: 4,  emoji: '🍍', category: 'fruit' },
        { id: 'watermelon', name: '수박',     price: 5,  emoji: '🍉', category: 'fruit' },
        { id: 'coconut',    name: '코코넛',   price: 4,  emoji: '🥥', category: 'fruit' },
        { id: 'lime',       name: '라임',     price: 2,  emoji: '🍋', category: 'fruit' },
        { id: 'avocado',    name: '아보카도', price: 5,  emoji: '🥑', category: 'fruit' },
        { id: 'kiwi',       name: '키위',     price: 3,  emoji: '🥝', category: 'fruit' },
        // ── 유제품 ──
        { id: 'cream',      name: '생크림',     price: 5,  emoji: '🥛', category: 'dairy' },
        { id: 'cheese',     name: '치즈',       price: 5,  emoji: '🧀', category: 'dairy' },
        { id: 'butter',     name: '버터',       price: 3,  emoji: '🧈', category: 'dairy' },
        { id: 'milk',       name: '우유',       price: 2,  emoji: '🥛', category: 'dairy' },
        { id: 'yogurt',     name: '요거트',     price: 3,  emoji: '🥛', category: 'dairy' },
        { id: 'mozzarella', name: '모짜렐라',   price: 6,  emoji: '🧀', category: 'dairy' },
        { id: 'parmesan',   name: '파마산치즈', price: 7,  emoji: '🧀', category: 'dairy' },
        // ── 곡물/면/빵 ──
        { id: 'flour',      name: '밀가루',     price: 2,  emoji: '🌾', category: 'grain' },
        { id: 'rice',       name: '밥',         price: 3,  emoji: '🍚', category: 'grain' },
        { id: 'glutinous',  name: '찹쌀',       price: 4,  emoji: '🍚', category: 'grain' },
        { id: 'oat',        name: '오트밀',     price: 3,  emoji: '🌾', category: 'grain' },
        { id: 'cornmeal',   name: '옥수수가루', price: 2,  emoji: '🌽', category: 'grain' },
        { id: 'pasta_n',    name: '파스타면',   price: 3,  emoji: '🍝', category: 'grain' },
        { id: 'udon',       name: '우동면',     price: 3,  emoji: '🍜', category: 'grain' },
        { id: 'soba',       name: '소바면',     price: 4,  emoji: '🍜', category: 'grain' },
        { id: 'ramen_n',    name: '라면사리',   price: 2,  emoji: '🍜', category: 'grain' },
        { id: 'bun',        name: '빵',         price: 2,  emoji: '🍞', category: 'grain' },
        { id: 'dough',      name: '도우',       price: 4,  emoji: '🫓', category: 'grain' },
        { id: 'tortilla',   name: '또띠아',     price: 3,  emoji: '🫓', category: 'grain' },
        { id: 'ricecake',   name: '떡',         price: 3,  emoji: '🍡', category: 'grain' },
        { id: 'dumpling_s', name: '만두피',     price: 3,  emoji: '🥟', category: 'grain' },
        { id: 'nacho',      name: '나초칩',     price: 3,  emoji: '🫓', category: 'grain' },
        { id: 'croissant_d',name: '크루아상반죽',price:4,  emoji: '🥐', category: 'grain' },
        { id: 'hotdog_bun', name: '핫도그빵',   price: 2,  emoji: '🌭', category: 'grain' },
        { id: 'waffle_d',   name: '와플반죽',   price: 3,  emoji: '🧇', category: 'grain' },
        { id: 'ricepaper',  name: '라이스페이퍼',price:2,  emoji: '🫓', category: 'grain' },
        // ── 단백질 ──
        { id: 'egg',        name: '계란',       price: 2,  emoji: '🥚', category: 'protein' },
        { id: 'chicken_m',  name: '닭고기',     price: 10, emoji: '🍗', category: 'protein' },
        { id: 'beef',       name: '소고기',     price: 10, emoji: '🥩', category: 'protein' },
        { id: 'pork',       name: '돼지고기',   price: 8,  emoji: '🥩', category: 'protein' },
        { id: 'bacon',      name: '베이컨',     price: 5,  emoji: '🥓', category: 'protein' },
        { id: 'ham',        name: '햄',         price: 4,  emoji: '🥓', category: 'protein' },
        { id: 'sausage',    name: '소시지',     price: 4,  emoji: '🌭', category: 'protein' },
        { id: 'patty',      name: '패티',       price: 8,  emoji: '🥩', category: 'protein' },
        { id: 'lamb',       name: '양고기',     price: 12, emoji: '🍖', category: 'protein' },
        { id: 'duck',       name: '오리고기',   price: 10, emoji: '🦆', category: 'protein' },
        // ── 해산물 ──
        { id: 'shrimp',     name: '새우',       price: 8,  emoji: '🦐', category: 'seafood' },
        { id: 'salmon',     name: '연어',       price: 10, emoji: '🍣', category: 'seafood' },
        { id: 'tuna',       name: '참치',       price: 8,  emoji: '🐟', category: 'seafood' },
        { id: 'squid',      name: '오징어',     price: 7,  emoji: '🦑', category: 'seafood' },
        { id: 'crab',       name: '게살',       price: 12, emoji: '🦀', category: 'seafood' },
        { id: 'clam',       name: '조개',       price: 6,  emoji: '🐚', category: 'seafood' },
        { id: 'octopus',    name: '문어',       price: 9,  emoji: '🐙', category: 'seafood' },
        { id: 'flatfish',   name: '광어',       price: 10, emoji: '🐟', category: 'seafood' },
        { id: 'eel',        name: '장어',       price: 12, emoji: '🐍', category: 'seafood' },
        { id: 'seaweed',    name: '김',         price: 2,  emoji: '🌿', category: 'seafood' },
        // ── 야채 ──
        { id: 'vegetable',  name: '야채',       price: 2,  emoji: '🥬', category: 'vegetable' },
        { id: 'garlic',     name: '마늘',       price: 2,  emoji: '🧄', category: 'vegetable' },
        { id: 'kimchi',     name: '김치',       price: 3,  emoji: '🥬', category: 'vegetable' },
        { id: 'lettuce',    name: '상추',       price: 2,  emoji: '🥬', category: 'vegetable' },
        { id: 'onion',      name: '양파',       price: 1,  emoji: '🧅', category: 'vegetable' },
        { id: 'pepper',     name: '고추',       price: 2,  emoji: '🌶️', category: 'vegetable' },
        { id: 'mushroom',   name: '버섯',       price: 3,  emoji: '🍄', category: 'vegetable' },
        { id: 'corn',       name: '옥수수',     price: 2,  emoji: '🌽', category: 'vegetable' },
        { id: 'potato',     name: '감자',       price: 2,  emoji: '🥔', category: 'vegetable' },
        { id: 'sweetpotato',name: '고구마',     price: 3,  emoji: '🍠', category: 'vegetable' },
        { id: 'sprout',     name: '콩나물',     price: 1,  emoji: '🌱', category: 'vegetable' },
        { id: 'spinach',    name: '시금치',     price: 2,  emoji: '🥬', category: 'vegetable' },
        { id: 'cucumber',   name: '오이',       price: 2,  emoji: '🥒', category: 'vegetable' },
        { id: 'carrot',     name: '당근',       price: 2,  emoji: '🥕', category: 'vegetable' },
        { id: 'broccoli',   name: '브로콜리',   price: 3,  emoji: '🥦', category: 'vegetable' },
        { id: 'zucchini',   name: '애호박',     price: 2,  emoji: '🥒', category: 'vegetable' },
        { id: 'greenonion', name: '파',         price: 1,  emoji: '🧅', category: 'vegetable' },
        { id: 'cabbage',    name: '양배추',     price: 2,  emoji: '🥬', category: 'vegetable' },
        { id: 'radish',     name: '무',         price: 2,  emoji: '🥬', category: 'vegetable' },
        { id: 'bean',       name: '콩',         price: 2,  emoji: '🫘', category: 'vegetable' },
        { id: 'tofu',       name: '두부',       price: 2,  emoji: '🧊', category: 'vegetable' },
        // ── 소스/양념 ──
        { id: 'sauce',      name: '양념',       price: 3,  emoji: '🥫', category: 'sauce' },
        { id: 'doenjang',   name: '된장',       price: 3,  emoji: '🥘', category: 'sauce' },
        { id: 'soy',        name: '간장',       price: 3,  emoji: '🍶', category: 'sauce' },
        { id: 'gochujang',  name: '고추장',     price: 3,  emoji: '🌶️', category: 'sauce' },
        { id: 'ketchup',    name: '케첩',       price: 2,  emoji: '🥫', category: 'sauce' },
        { id: 'mustard',    name: '머스타드',   price: 2,  emoji: '🟡', category: 'sauce' },
        { id: 'mayo',       name: '마요네즈',   price: 2,  emoji: '🥚', category: 'sauce' },
        { id: 'teriyaki',   name: '데리야끼소스',price: 3, emoji: '🍶', category: 'sauce' },
        { id: 'curry',      name: '카레가루',   price: 4,  emoji: '🍛', category: 'sauce' },
        { id: 'salsa',      name: '살사소스',   price: 3,  emoji: '🥫', category: 'sauce' },
        { id: 'pesto',      name: '페스토',     price: 5,  emoji: '🌿', category: 'sauce' },
        { id: 'wasabi',     name: '와사비',     price: 3,  emoji: '🟢', category: 'sauce' },
        { id: 'vinegar',    name: '식초',       price: 1,  emoji: '🫗', category: 'sauce' },
        { id: 'sesameoil',  name: '참기름',     price: 3,  emoji: '🫗', category: 'sauce' },
        { id: 'oystersauce',name: '굴소스',     price: 3,  emoji: '🥫', category: 'sauce' },
        { id: 'fishsauce',  name: '액젓',       price: 3,  emoji: '🫗', category: 'sauce' },
        { id: 'coconutmilk',name: '코코넛밀크', price: 4,  emoji: '🥥', category: 'sauce' },
        { id: 'chili',      name: '칠리소스',   price: 3,  emoji: '🌶️', category: 'sauce' },
        { id: 'oliveoil',   name: '올리브오일', price: 4,  emoji: '🫒', category: 'sauce' },
        // ── 단맛/디저트 재료 ──
        { id: 'chocolate',  name: '초콜릿',     price: 4,  emoji: '🍫', category: 'sweet' },
        { id: 'sugar',      name: '설탕',       price: 1,  emoji: '🍬', category: 'sweet' },
        { id: 'almond',     name: '아몬드',     price: 4,  emoji: '🌰', category: 'sweet' },
        { id: 'honey',      name: '꿀',         price: 4,  emoji: '🍯', category: 'sweet' },
        { id: 'vanilla',    name: '바닐라',     price: 3,  emoji: '🌿', category: 'sweet' },
        { id: 'cinnamon',   name: '시나몬',     price: 2,  emoji: '🟤', category: 'sweet' },
        { id: 'matcha',     name: '말차',       price: 5,  emoji: '🍵', category: 'sweet' },
        { id: 'caramel',    name: '카라멜',     price: 3,  emoji: '🟫', category: 'sweet' },
        { id: 'jam',        name: '잼',         price: 3,  emoji: '🫙', category: 'sweet' },
        { id: 'syrup',      name: '시럽',       price: 2,  emoji: '🍯', category: 'sweet' },
        { id: 'redbean',    name: '팥',         price: 3,  emoji: '🫘', category: 'sweet' },
        { id: 'coffee',     name: '원두',       price: 5,  emoji: '☕', category: 'sweet' },
        { id: 'greentea',   name: '녹차',       price: 4,  emoji: '🍵', category: 'sweet' },
        { id: 'icecream_b', name: '아이스크림베이스', price: 4, emoji: '🍦', category: 'sweet' },
        // ── 기타 ──
        { id: 'ice',        name: '얼음',       price: 1,  emoji: '🧊', category: 'other' },
        { id: 'batter',     name: '튀김가루',   price: 2,  emoji: '🌾', category: 'other' },
        { id: 'nori',       name: '김(해태)',   price: 3,  emoji: '🌿', category: 'other' },
        { id: 'sesame',     name: '깨',         price: 2,  emoji: '⚪', category: 'other' },
        { id: 'water',      name: '물',         price: 1,  emoji: '💧', category: 'other' },
        { id: 'salt',       name: '소금',       price: 1,  emoji: '🧂', category: 'other' }
    ];

    // ==================== 레시피 (30개 업종 × 10~30개) ====================
    let _id = 1;
    function R(name, shopType, emoji, ings) {
        return { id: _id++, name, shopType, emoji, ingredients: ings.map(([ingredientId, amount]) => ({ ingredientId, amount })) };
    }

    const recipes = [
        // ──────────────────────────────────────────
        // 1. 한식당 (15개)
        // ──────────────────────────────────────────
        R('김치찌개',   'korean', '🍲', [['kimchi',2],['pork',1],['tofu',1],['greenonion',1]]),
        R('된장찌개',   'korean', '🍜', [['doenjang',1],['tofu',1],['zucchini',1],['mushroom',1]]),
        R('비빔밥',     'korean', '🍱', [['rice',1],['vegetable',3],['egg',1],['gochujang',1]]),
        R('불고기',     'korean', '🥩', [['beef',2],['sauce',1],['onion',1]]),
        R('잡채',       'korean', '🍝', [['vegetable',2],['mushroom',1],['soy',1],['sesameoil',1]]),
        R('김치볶음밥', 'korean', '🍳', [['rice',1],['kimchi',2],['egg',1]]),
        R('제육볶음',   'korean', '🌶️', [['pork',2],['gochujang',1],['onion',1],['garlic',1]]),
        R('갈비찜',     'korean', '🍖', [['beef',3],['soy',1],['radish',1],['carrot',1]]),
        R('닭갈비',     'korean', '🍗', [['chicken_m',2],['gochujang',1],['cabbage',1],['sweetpotato',1]]),
        R('순두부찌개', 'korean', '🍲', [['tofu',2],['egg',1],['pepper',1],['clam',1]]),
        R('떡볶이',     'korean', '🌶️', [['ricecake',2],['gochujang',1],['sugar',1]]),
        R('해물파전',   'korean', '🥞', [['flour',2],['greenonion',2],['squid',1],['egg',1]]),
        R('오징어볶음', 'korean', '🦑', [['squid',2],['gochujang',1],['onion',1],['carrot',1]]),
        R('소불고기덮밥','korean','🍚', [['rice',1],['beef',2],['onion',1],['soy',1]]),
        R('콩나물국밥', 'korean', '🍜', [['sprout',3],['rice',1],['greenonion',1]]),

        // ──────────────────────────────────────────
        // 2. 찌개전문점 (12개)
        // ──────────────────────────────────────────
        R('김치찌개(진)',  'jjigae', '🍲', [['kimchi',3],['pork',1],['tofu',1]]),
        R('된장찌개(진)',  'jjigae', '🍜', [['doenjang',2],['tofu',1],['potato',1],['zucchini',1]]),
        R('부대찌개',      'jjigae', '🍲', [['sausage',2],['ramen_n',1],['kimchi',1],['ham',1]]),
        R('순두부찌개',    'jjigae', '🥘', [['tofu',2],['egg',1],['shrimp',1]]),
        R('해물찌개',      'jjigae', '🦐', [['shrimp',1],['squid',1],['clam',1],['tofu',1]]),
        R('참치찌개',      'jjigae', '🐟', [['tuna',2],['tofu',1],['kimchi',1]]),
        R('청국장찌개',    'jjigae', '🫘', [['doenjang',2],['bean',1],['tofu',1],['pepper',1]]),
        R('만두전골',      'jjigae', '🥟', [['dumpling_s',2],['pork',1],['mushroom',1],['vegetable',1]]),
        R('감자탕',        'jjigae', '🥔', [['pork',2],['potato',2],['pepper',1],['greenonion',1]]),
        R('곱창전골',      'jjigae', '🍲', [['beef',2],['vegetable',2],['mushroom',1]]),
        R('짬뽕전골',      'jjigae', '🌶️', [['shrimp',1],['squid',1],['vegetable',2],['ramen_n',1]]),
        R('버섯전골',      'jjigae', '🍄', [['mushroom',3],['tofu',1],['vegetable',1],['soy',1]]),

        // ──────────────────────────────────────────
        // 3. 국밥집 (12개)
        // ──────────────────────────────────────────
        R('돼지국밥',   'gukbap', '🍜', [['pork',2],['rice',1],['greenonion',1]]),
        R('소머리국밥', 'gukbap', '🍲', [['beef',2],['rice',1],['greenonion',1]]),
        R('순대국밥',   'gukbap', '🍜', [['pork',1],['rice',1],['greenonion',1],['sausage',1]]),
        R('설렁탕',     'gukbap', '🥛', [['beef',2],['rice',1],['greenonion',1],['salt',1]]),
        R('곰탕',       'gukbap', '🍲', [['beef',3],['rice',1],['salt',1]]),
        R('해장국',     'gukbap', '🍜', [['sprout',2],['beef',1],['rice',1],['egg',1]]),
        R('추어탕',     'gukbap', '🐟', [['tuna',1],['vegetable',2],['rice',1],['pepper',1]]),
        R('갈비탕',     'gukbap', '🍖', [['beef',3],['radish',1],['rice',1],['greenonion',1]]),
        R('삼계탕',     'gukbap', '🍗', [['chicken_m',2],['rice',1],['garlic',2],['greenonion',1]]),
        R('소고기무국', 'gukbap', '🍜', [['beef',1],['radish',2],['rice',1],['soy',1]]),
        R('북어국',     'gukbap', '🐟', [['tuna',1],['egg',1],['rice',1],['greenonion',1]]),
        R('콩나물국밥', 'gukbap', '🌱', [['sprout',3],['rice',1],['greenonion',1],['kimchi',1]]),

        // ──────────────────────────────────────────
        // 4. 고기구이 (12개)
        // ──────────────────────────────────────────
        R('삼겹살',      'bbq', '🥩', [['pork',3],['lettuce',2],['garlic',1]]),
        R('소갈비',      'bbq', '🍖', [['beef',3],['soy',1],['garlic',1]]),
        R('차돌박이',    'bbq', '🥩', [['beef',2],['lettuce',1],['greenonion',1]]),
        R('양념갈비',    'bbq', '🌶️', [['beef',3],['sauce',1],['gochujang',1]]),
        R('항정살',      'bbq', '🥓', [['pork',2],['salt',1],['lettuce',1]]),
        R('대패삼겹살',  'bbq', '🥩', [['pork',2],['onion',1],['garlic',1]]),
        R('소불고기구이','bbq', '🥩', [['beef',2],['soy',1],['onion',1],['mushroom',1]]),
        R('오리불고기',  'bbq', '🦆', [['duck',2],['sauce',1],['vegetable',1]]),
        R('양고기구이',  'bbq', '🍖', [['lamb',2],['salt',1],['lettuce',1],['garlic',1]]),
        R('돼지목살',    'bbq', '🥩', [['pork',2],['lettuce',1],['garlic',1],['pepper',1]]),
        R('치마살구이',  'bbq', '🥩', [['beef',2],['salt',1],['sesameoil',1]]),
        R('곱창구이',    'bbq', '🍳', [['beef',2],['salt',1],['pepper',1],['garlic',1]]),

        // ──────────────────────────────────────────
        // 5. 분식집 (15개)
        // ──────────────────────────────────────────
        R('떡볶이',     'snack', '🌶️', [['ricecake',2],['gochujang',1],['sugar',1]]),
        R('순대',       'snack', '🫃', [['ramen_n',1],['pork',1],['greenonion',1]]),
        R('튀김모둠',   'snack', '🍤', [['batter',2],['vegetable',1],['shrimp',1]]),
        R('김밥',       'snack', '🍙', [['rice',1],['seaweed',1],['vegetable',1],['egg',1],['ham',1]]),
        R('라면',       'snack', '🍜', [['ramen_n',1],['egg',1],['greenonion',1]]),
        R('오뎅탕',     'snack', '🍢', [['flour',1],['radish',1],['soy',1],['water',1]]),
        R('쫄면',       'snack', '🍜', [['ramen_n',1],['vegetable',1],['gochujang',1],['vinegar',1]]),
        R('라볶이',     'snack', '🌶️', [['ramen_n',1],['ricecake',1],['gochujang',1]]),
        R('김치볶음밥(분)','snack','🍳',[['rice',1],['kimchi',2],['egg',1],['sesameoil',1]]),
        R('참치김밥',   'snack', '🍙', [['rice',1],['seaweed',1],['tuna',1],['mayo',1]]),
        R('치즈김밥',   'snack', '🧀', [['rice',1],['seaweed',1],['cheese',1],['ham',1]]),
        R('비빔국수',   'snack', '🍜', [['ramen_n',1],['gochujang',1],['vegetable',1],['vinegar',1]]),
        R('만두',       'snack', '🥟', [['dumpling_s',2],['pork',1],['vegetable',1]]),
        R('잔치국수',   'snack', '🍜', [['udon',1],['vegetable',1],['soy',1],['egg',1]]),
        R('계란말이',   'snack', '🥚', [['egg',3],['greenonion',1],['carrot',1]]),

        // ──────────────────────────────────────────
        // 6. 떡집 (10개)
        // ──────────────────────────────────────────
        R('송편',       'tteok', '🍡', [['glutinous',2],['sesame',1],['honey',1]]),
        R('인절미',     'tteok', '🍡', [['glutinous',2],['bean',1]]),
        R('백설기',     'tteok', '🍚', [['glutinous',2],['sugar',1],['water',1]]),
        R('꿀떡',       'tteok', '🍯', [['glutinous',2],['honey',2]]),
        R('팥떡',       'tteok', '🫘', [['glutinous',2],['redbean',2]]),
        R('절편',       'tteok', '🌸', [['glutinous',2],['sugar',1]]),
        R('약식',       'tteok', '🍯', [['glutinous',2],['honey',1],['soy',1],['sesame',1]]),
        R('경단',       'tteok', '⚪', [['glutinous',2],['redbean',1],['sesame',1]]),
        R('호떡',       'tteok', '🫓', [['flour',2],['sugar',2],['cinnamon',1]]),
        R('가래떡',     'tteok', '🍡', [['glutinous',3],['salt',1]]),

        // ──────────────────────────────────────────
        // 7. 죽전문점 (10개)
        // ──────────────────────────────────────────
        R('전복죽',     'porridge', '🥣', [['rice',2],['clam',2],['sesameoil',1]]),
        R('호박죽',     'porridge', '🎃', [['sweetpotato',2],['glutinous',1],['sugar',1]]),
        R('참치야채죽', 'porridge', '🐟', [['rice',2],['tuna',1],['carrot',1],['greenonion',1]]),
        R('닭죽',       'porridge', '🍗', [['rice',2],['chicken_m',1],['garlic',1],['greenonion',1]]),
        R('소고기죽',   'porridge', '🥩', [['rice',2],['beef',1],['carrot',1],['sesameoil',1]]),
        R('팥죽',       'porridge', '🫘', [['rice',1],['redbean',3],['sugar',1]]),
        R('야채죽',     'porridge', '🥬', [['rice',2],['vegetable',2],['carrot',1]]),
        R('새우죽',     'porridge', '🦐', [['rice',2],['shrimp',2],['greenonion',1]]),
        R('버섯죽',     'porridge', '🍄', [['rice',2],['mushroom',2],['butter',1]]),
        R('잣죽',       'porridge', '🥣', [['rice',2],['almond',2],['salt',1]]),

        // ──────────────────────────────────────────
        // 8. 도시락가게 (12개)
        // ──────────────────────────────────────────
        R('제육도시락',   'dosirak', '🍱', [['rice',1],['pork',2],['gochujang',1],['vegetable',1]]),
        R('불고기도시락', 'dosirak', '🍱', [['rice',1],['beef',2],['soy',1],['onion',1]]),
        R('치킨도시락',   'dosirak', '🍗', [['rice',1],['chicken_m',1],['batter',1],['lettuce',1]]),
        R('연어도시락',   'dosirak', '🍣', [['rice',1],['salmon',1],['vegetable',1],['sesameoil',1]]),
        R('김치볶음밥도시락','dosirak','🍳',[['rice',1],['kimchi',2],['egg',1],['seaweed',1]]),
        R('돈까스도시락', 'dosirak', '🍱', [['rice',1],['pork',1],['batter',1],['cabbage',1]]),
        R('갈비도시락',   'dosirak', '🍖', [['rice',1],['beef',2],['sauce',1]]),
        R('비빔밥도시락', 'dosirak', '🍚', [['rice',1],['vegetable',3],['gochujang',1],['egg',1]]),
        R('오므라이스도시락','dosirak','🍳',[['rice',1],['egg',2],['ketchup',1],['onion',1]]),
        R('함박도시락',   'dosirak', '🍱', [['rice',1],['patty',1],['vegetable',1],['ketchup',1]]),
        R('새우튀김도시락','dosirak','🍤', [['rice',1],['shrimp',2],['batter',1]]),
        R('잡채밥도시락', 'dosirak', '🍱', [['rice',1],['vegetable',2],['mushroom',1],['soy',1]]),

        // ──────────────────────────────────────────
        // 9. 파스타전문점 (12개)
        // ──────────────────────────────────────────
        R('카르보나라',     'pasta', '🍝', [['pasta_n',1],['cream',2],['bacon',1],['parmesan',1]]),
        R('토마토파스타',   'pasta', '🍅', [['pasta_n',1],['tomato',3],['garlic',1]]),
        R('알리오올리오',   'pasta', '🧄', [['pasta_n',1],['garlic',2],['oliveoil',1],['pepper',1]]),
        R('해물파스타',     'pasta', '🦐', [['pasta_n',1],['shrimp',1],['squid',1],['tomato',1]]),
        R('봉골레파스타',   'pasta', '🐚', [['pasta_n',1],['clam',2],['garlic',1],['oliveoil',1]]),
        R('크림파스타',     'pasta', '🥛', [['pasta_n',1],['cream',2],['mushroom',1],['butter',1]]),
        R('로제파스타',     'pasta', '🌹', [['pasta_n',1],['cream',1],['tomato',2],['garlic',1]]),
        R('라자냐',         'pasta', '🧀', [['pasta_n',2],['beef',1],['tomato',2],['mozzarella',1]]),
        R('페스토파스타',   'pasta', '🌿', [['pasta_n',1],['pesto',2],['parmesan',1]]),
        R('명란파스타',     'pasta', '🐟', [['pasta_n',1],['tuna',1],['cream',1],['butter',1]]),
        R('베이컨토마토',   'pasta', '🥓', [['pasta_n',1],['bacon',2],['tomato',2],['onion',1]]),
        R('까치오에페페',   'pasta', '🧀', [['pasta_n',1],['parmesan',2],['pepper',1],['butter',1]]),

        // ──────────────────────────────────────────
        // 10. 피자가게 (12개)
        // ──────────────────────────────────────────
        R('마르게리타',     'pizza', '🍕', [['dough',1],['mozzarella',2],['tomato',2]]),
        R('페퍼로니피자',   'pizza', '🍕', [['dough',1],['mozzarella',1],['sausage',2]]),
        R('하와이안피자',   'pizza', '🍍', [['dough',1],['mozzarella',1],['ham',1],['pineapple',1]]),
        R('고르곤졸라피자', 'pizza', '🧀', [['dough',1],['cheese',2],['honey',1]]),
        R('불고기피자',     'pizza', '🥩', [['dough',1],['mozzarella',1],['beef',1],['sauce',1]]),
        R('콤비네이션피자', 'pizza', '🍕', [['dough',1],['mozzarella',1],['sausage',1],['mushroom',1],['pepper',1]]),
        R('치즈피자',       'pizza', '🧀', [['dough',1],['mozzarella',2],['cheese',1],['parmesan',1]]),
        R('바질페스토피자', 'pizza', '🌿', [['dough',1],['mozzarella',1],['pesto',1],['tomato',1]]),
        R('시카고딥디쉬',   'pizza', '🥧', [['dough',2],['mozzarella',2],['tomato',2],['sausage',1]]),
        R('갈릭피자',       'pizza', '🧄', [['dough',1],['mozzarella',1],['garlic',2],['butter',1]]),
        R('포테이토피자',   'pizza', '🥔', [['dough',1],['mozzarella',1],['potato',2],['mayo',1]]),
        R('새우피자',       'pizza', '🦐', [['dough',1],['mozzarella',1],['shrimp',2],['garlic',1]]),

        // ──────────────────────────────────────────
        // 11. 버거집 (12개)
        // ──────────────────────────────────────────
        R('치즈버거',       'burger', '🍔', [['bun',1],['patty',1],['cheese',1],['lettuce',1]]),
        R('베이컨버거',     'burger', '🥓', [['bun',1],['patty',1],['bacon',2],['lettuce',1]]),
        R('더블버거',       'burger', '🍔', [['bun',1],['patty',2],['cheese',1]]),
        R('머쉬룸버거',     'burger', '🍄', [['bun',1],['patty',1],['mushroom',2],['cheese',1]]),
        R('치킨버거',       'burger', '🍗', [['bun',1],['chicken_m',1],['lettuce',1],['mayo',1]]),
        R('새우버거',       'burger', '🦐', [['bun',1],['shrimp',2],['lettuce',1],['mayo',1]]),
        R('불고기버거',     'burger', '🥩', [['bun',1],['beef',1],['sauce',1],['lettuce',1]]),
        R('아보카도버거',   'burger', '🥑', [['bun',1],['patty',1],['avocado',1],['lettuce',1]]),
        R('에그버거',       'burger', '🥚', [['bun',1],['patty',1],['egg',1],['cheese',1]]),
        R('핫치킨버거',     'burger', '🌶️', [['bun',1],['chicken_m',1],['chili',1],['lettuce',1]]),
        R('피쉬버거',       'burger', '🐟', [['bun',1],['tuna',1],['lettuce',1],['mayo',1]]),
        R('와사비버거',     'burger', '🟢', [['bun',1],['patty',1],['wasabi',1],['lettuce',1]]),

        // ──────────────────────────────────────────
        // 12. 스테이크하우스 (10개)
        // ──────────────────────────────────────────
        R('안심스테이크',   'steak', '🥩', [['beef',3],['butter',1],['garlic',1],['salt',1]]),
        R('등심스테이크',   'steak', '🥩', [['beef',3],['oliveoil',1],['salt',1],['pepper',1]]),
        R('립아이스테이크', 'steak', '🍖', [['beef',3],['butter',1],['garlic',1],['mushroom',1]]),
        R('티본스테이크',   'steak', '🦴', [['beef',4],['salt',1],['oliveoil',1]]),
        R('함박스테이크',   'steak', '🍔', [['patty',2],['onion',1],['mushroom',1],['ketchup',1]]),
        R('치킨스테이크',   'steak', '🍗', [['chicken_m',2],['butter',1],['garlic',1],['broccoli',1]]),
        R('연어스테이크',   'steak', '🍣', [['salmon',2],['lemon',1],['butter',1],['vegetable',1]]),
        R('폭찹스테이크',   'steak', '🥩', [['pork',2],['garlic',1],['butter',1],['apple',1]]),
        R('양갈비스테이크', 'steak', '🍖', [['lamb',2],['garlic',1],['oliveoil',1],['salt',1]]),
        R('파스타+스테이크','steak', '🍝', [['beef',2],['pasta_n',1],['cream',1],['mushroom',1]]),

        // ──────────────────────────────────────────
        // 13. 샌드위치가게 (12개)
        // ──────────────────────────────────────────
        R('BLT샌드위치',    'sandwich', '🥪', [['bun',1],['bacon',2],['lettuce',1],['tomato',1]]),
        R('에그샌드위치',    'sandwich', '🥚', [['bun',1],['egg',2],['mayo',1]]),
        R('참치샌드위치',    'sandwich', '🐟', [['bun',1],['tuna',1],['mayo',1],['lettuce',1]]),
        R('치킨샌드위치',    'sandwich', '🍗', [['bun',1],['chicken_m',1],['lettuce',1],['mayo',1]]),
        R('클럽샌드위치',    'sandwich', '🥪', [['bun',2],['bacon',1],['chicken_m',1],['lettuce',1],['tomato',1]]),
        R('연어샌드위치',    'sandwich', '🍣', [['bun',1],['salmon',1],['lettuce',1],['cream',1]]),
        R('아보카도샌드위치','sandwich', '🥑', [['bun',1],['avocado',1],['egg',1],['tomato',1]]),
        R('햄치즈샌드위치',  'sandwich', '🧀', [['bun',1],['ham',1],['cheese',1],['lettuce',1]]),
        R('카프레제샌드위치','sandwich', '🍅', [['bun',1],['mozzarella',1],['tomato',1],['pesto',1]]),
        R('스테이크샌드위치','sandwich', '🥩', [['bun',1],['beef',1],['onion',1],['mustard',1]]),
        R('새우샌드위치',    'sandwich', '🦐', [['bun',1],['shrimp',1],['lettuce',1],['mayo',1]]),
        R('그릴드치즈샌드위치','sandwich','🧀',[['bun',1],['cheese',2],['butter',1]]),

        // ──────────────────────────────────────────
        // 14. 샐러드가게 (10개)
        // ──────────────────────────────────────────
        R('시저샐러드',     'salad', '🥗', [['lettuce',2],['parmesan',1],['chicken_m',1],['mayo',1]]),
        R('닭가슴살샐러드', 'salad', '🥬', [['lettuce',2],['chicken_m',1],['tomato',1],['corn',1]]),
        R('연어샐러드',     'salad', '🍣', [['lettuce',2],['salmon',1],['avocado',1],['lemon',1]]),
        R('새우샐러드',     'salad', '🦐', [['lettuce',2],['shrimp',2],['tomato',1]]),
        R('콥샐러드',       'salad', '🥚', [['lettuce',2],['egg',1],['bacon',1],['avocado',1],['corn',1]]),
        R('그릭샐러드',     'salad', '🧀', [['lettuce',1],['tomato',1],['cucumber',1],['cheese',1],['oliveoil',1]]),
        R('망고샐러드',     'salad', '🥭', [['lettuce',2],['mango',1],['shrimp',1]]),
        R('퀴노아샐러드',   'salad', '🥗', [['oat',1],['broccoli',1],['avocado',1],['tomato',1]]),
        R('참치샐러드',     'salad', '🐟', [['lettuce',2],['tuna',1],['corn',1],['mayo',1]]),
        R('두부샐러드',     'salad', '🧊', [['lettuce',2],['tofu',1],['carrot',1],['sesameoil',1]]),

        // ──────────────────────────────────────────
        // 15. 치킨집 (12개)
        // ──────────────────────────────────────────
        R('후라이드치킨',   'chicken', '🍗', [['chicken_m',2],['batter',2],['flour',1]]),
        R('양념치킨',       'chicken', '🌶️', [['chicken_m',2],['batter',1],['gochujang',1],['sugar',1]]),
        R('간장치킨',       'chicken', '🍶', [['chicken_m',2],['soy',1],['garlic',1]]),
        R('마늘치킨',       'chicken', '🧄', [['chicken_m',2],['garlic',3],['butter',1]]),
        R('치즈치킨',       'chicken', '🧀', [['chicken_m',2],['batter',1],['cheese',2]]),
        R('파닭',           'chicken', '🧅', [['chicken_m',2],['batter',1],['greenonion',2]]),
        R('허니버터치킨',   'chicken', '🍯', [['chicken_m',2],['batter',1],['honey',1],['butter',1]]),
        R('크리스피치킨',   'chicken', '🍗', [['chicken_m',2],['batter',2],['cornmeal',1]]),
        R('순살치킨',       'chicken', '🍗', [['chicken_m',2],['batter',1],['flour',1]]),
        R('로스트치킨',     'chicken', '🍗', [['chicken_m',2],['garlic',1],['oliveoil',1],['salt',1]]),
        R('닭강정',         'chicken', '🍯', [['chicken_m',2],['batter',1],['sugar',1],['soy',1]]),
        R('핫스파이시치킨', 'chicken', '🌶️', [['chicken_m',2],['batter',1],['chili',2]]),

        // ──────────────────────────────────────────
        // 16. 중식당 (15개)
        // ──────────────────────────────────────────
        R('짜장면',     'chinese', '🍜', [['ramen_n',1],['pork',1],['onion',1],['sauce',1]]),
        R('짬뽕',       'chinese', '🌶️', [['ramen_n',1],['shrimp',1],['squid',1],['vegetable',1],['pepper',1]]),
        R('탕수육',     'chinese', '🍖', [['pork',2],['batter',1],['vinegar',1],['sugar',1]]),
        R('볶음밥',     'chinese', '🍳', [['rice',1],['egg',1],['vegetable',1],['soy',1]]),
        R('군만두',     'chinese', '🥟', [['dumpling_s',2],['pork',1],['vegetable',1]]),
        R('물만두',     'chinese', '🥟', [['dumpling_s',2],['pork',1],['vegetable',1],['water',1]]),
        R('깐풍기',     'chinese', '🌶️', [['chicken_m',2],['batter',1],['pepper',1],['garlic',1]]),
        R('마파두부',   'chinese', '🧊', [['tofu',2],['pork',1],['gochujang',1],['greenonion',1]]),
        R('유린기',     'chinese', '🍗', [['chicken_m',2],['batter',1],['vinegar',1],['soy',1]]),
        R('고추잡채',   'chinese', '🌶️', [['pork',1],['pepper',2],['mushroom',1],['oystersauce',1]]),
        R('팔보채',     'chinese', '🦐', [['shrimp',1],['squid',1],['vegetable',2],['oystersauce',1]]),
        R('잡채밥',     'chinese', '🍚', [['rice',1],['vegetable',2],['mushroom',1],['oystersauce',1]]),
        R('양장피',     'chinese', '🥒', [['vegetable',2],['shrimp',1],['mustard',1],['vinegar',1]]),
        R('울면',       'chinese', '🍜', [['ramen_n',1],['shrimp',1],['vegetable',1],['egg',1]]),
        R('라조기',     'chinese', '🌶️', [['chicken_m',2],['batter',1],['chili',1],['garlic',1]]),

        // ──────────────────────────────────────────
        // 17. 일식당 (12개)
        // ──────────────────────────────────────────
        R('돈까스',     'japanese', '🥩', [['pork',2],['batter',1],['flour',1],['cabbage',1]]),
        R('우동',       'japanese', '🍜', [['udon',1],['soy',1],['greenonion',1],['egg',1]]),
        R('라멘',       'japanese', '🍜', [['ramen_n',1],['pork',1],['egg',1],['greenonion',1]]),
        R('카레라이스', 'japanese', '🍛', [['rice',1],['curry',1],['potato',1],['carrot',1],['onion',1]]),
        R('규동',       'japanese', '🍚', [['rice',1],['beef',2],['onion',1],['soy',1]]),
        R('오야코동',   'japanese', '🍗', [['rice',1],['chicken_m',1],['egg',2],['onion',1]]),
        R('텐동',       'japanese', '🍤', [['rice',1],['shrimp',2],['batter',1]]),
        R('일식카레',   'japanese', '🍛', [['rice',1],['curry',1],['chicken_m',1],['vegetable',1]]),
        R('야키소바',   'japanese', '🍜', [['ramen_n',1],['pork',1],['vegetable',1],['oystersauce',1]]),
        R('다마고야끼', 'japanese', '🥚', [['egg',3],['sugar',1],['soy',1]]),
        R('에비프라이',  'japanese', '🦐', [['shrimp',2],['batter',1],['flour',1],['cabbage',1]]),
        R('미소된장국', 'japanese', '🍜', [['doenjang',1],['tofu',1],['seaweed',1],['greenonion',1]]),

        // ──────────────────────────────────────────
        // 18. 초밥집 (15개)
        // ──────────────────────────────────────────
        R('연어초밥',     'sushi', '🍣', [['rice',1],['salmon',1],['wasabi',1]]),
        R('참치초밥',     'sushi', '🐟', [['rice',1],['tuna',1],['wasabi',1]]),
        R('새우초밥',     'sushi', '🦐', [['rice',1],['shrimp',1],['wasabi',1]]),
        R('광어초밥',     'sushi', '🐟', [['rice',1],['flatfish',1],['wasabi',1]]),
        R('장어초밥',     'sushi', '🍣', [['rice',1],['eel',1],['teriyaki',1]]),
        R('문어초밥',     'sushi', '🐙', [['rice',1],['octopus',1],['wasabi',1]]),
        R('계란초밥',     'sushi', '🥚', [['rice',1],['egg',2],['sugar',1],['nori',1]]),
        R('연어롤',       'sushi', '🍣', [['rice',1],['salmon',1],['nori',1],['avocado',1]]),
        R('참치롤',       'sushi', '🐟', [['rice',1],['tuna',1],['nori',1],['cucumber',1]]),
        R('캘리포니아롤', 'sushi', '🥑', [['rice',1],['crab',1],['avocado',1],['nori',1]]),
        R('새우튀김롤',   'sushi', '🦐', [['rice',1],['shrimp',1],['batter',1],['nori',1]]),
        R('사시미모둠',   'sushi', '🐟', [['salmon',1],['tuna',1],['flatfish',1],['shrimp',1]]),
        R('모둠초밥',     'sushi', '🍣', [['rice',2],['salmon',1],['tuna',1],['shrimp',1],['wasabi',1]]),
        R('유부초밥',     'sushi', '🍙', [['rice',1],['tofu',1],['vinegar',1],['sugar',1]]),
        R('연어회덮밥',   'sushi', '🍚', [['rice',1],['salmon',2],['soy',1],['wasabi',1]]),

        // ──────────────────────────────────────────
        // 19. 태국음식점 (12개)
        // ──────────────────────────────────────────
        R('팟타이',       'thai', '🍜', [['ramen_n',1],['shrimp',1],['egg',1],['fishsauce',1],['lime',1]]),
        R('똠양꿍',       'thai', '🍲', [['shrimp',2],['mushroom',1],['coconutmilk',1],['lime',1]]),
        R('그린커리',     'thai', '🍛', [['chicken_m',1],['coconutmilk',2],['curry',1],['vegetable',1]]),
        R('레드커리',     'thai', '🌶️', [['pork',1],['coconutmilk',2],['curry',1],['pepper',1]]),
        R('망고스티키라이스','thai','🥭', [['glutinous',2],['mango',1],['coconutmilk',1]]),
        R('쏨땀',         'thai', '🥗', [['carrot',1],['lime',1],['fishsauce',1],['pineapple',1],['pepper',1]]),
        R('카오팟',       'thai', '🍳', [['rice',1],['egg',1],['onion',1],['fishsauce',1]]),
        R('마싸만커리',   'thai', '🍛', [['beef',1],['coconutmilk',2],['curry',1],['potato',1]]),
        R('가이양',       'thai', '🍗', [['chicken_m',2],['fishsauce',1],['garlic',1],['lime',1]]),
        R('팟카파오',     'thai', '🌶️', [['pork',1],['pepper',2],['garlic',1],['fishsauce',1],['egg',1]]),
        R('코코넛수프',   'thai', '🥥', [['coconutmilk',2],['chicken_m',1],['mushroom',1],['lime',1]]),
        R('태국볶음면',   'thai', '🍜', [['ramen_n',1],['chicken_m',1],['vegetable',1],['oystersauce',1]]),

        // ──────────────────────────────────────────
        // 20. 인도음식점 (12개)
        // ──────────────────────────────────────────
        R('버터치킨커리', 'indian', '🍛', [['chicken_m',2],['butter',1],['cream',1],['curry',1]]),
        R('탄두리치킨',   'indian', '🍗', [['chicken_m',2],['yogurt',1],['curry',1],['garlic',1]]),
        R('달커리',       'indian', '🫘', [['bean',2],['curry',1],['tomato',1],['onion',1]]),
        R('사모사',       'indian', '🥟', [['dumpling_s',2],['potato',1],['curry',1]]),
        R('비리야니',     'indian', '🍚', [['rice',2],['chicken_m',1],['curry',1],['onion',1]]),
        R('팔락파니르',   'indian', '🥬', [['spinach',2],['cheese',1],['cream',1],['garlic',1]]),
        R('나시고렝',     'indian', '🍳', [['rice',1],['egg',1],['shrimp',1],['soy',1],['onion',1]]),
        R('난(빵)',       'indian', '🫓', [['flour',2],['yogurt',1],['butter',1]]),
        R('티카마살라',   'indian', '🌶️', [['chicken_m',2],['curry',1],['cream',1],['tomato',1]]),
        R('알루고비',     'indian', '🥔', [['potato',2],['broccoli',1],['curry',1],['onion',1]]),
        R('차이라떼',     'indian', '🍵', [['milk',1],['greentea',1],['cinnamon',1],['sugar',1]]),
        R('라씨',         'indian', '🥛', [['yogurt',2],['mango',1],['sugar',1]]),

        // ──────────────────────────────────────────
        // 21. 딤섬전문점 (12개)
        // ──────────────────────────────────────────
        R('하가우',       'dimsum', '🦐', [['dumpling_s',2],['shrimp',2]]),
        R('샤오마이',     'dimsum', '🥟', [['dumpling_s',2],['pork',1],['shrimp',1]]),
        R('차슈바오',     'dimsum', '🥟', [['flour',2],['pork',1],['sauce',1]]),
        R('춘권',         'dimsum', '🥟', [['ricepaper',2],['pork',1],['vegetable',1]]),
        R('탕수만두',     'dimsum', '🥟', [['dumpling_s',2],['pork',1],['vinegar',1],['sugar',1]]),
        R('새우만두',     'dimsum', '🦐', [['dumpling_s',2],['shrimp',2],['greenonion',1]]),
        R('고기만두',     'dimsum', '🥟', [['dumpling_s',2],['pork',2],['onion',1]]),
        R('깨만두',       'dimsum', '⚪', [['dumpling_s',2],['redbean',1],['sesame',1]]),
        R('상하이만두',   'dimsum', '🥟', [['dumpling_s',2],['pork',1],['soy',1]]),
        R('연잎밥',       'dimsum', '🍚', [['glutinous',2],['pork',1],['mushroom',1]]),
        R('치킨피트',     'dimsum', '🍗', [['chicken_m',1],['soy',1],['garlic',1],['oystersauce',1]]),
        R('에그타르트',   'dimsum', '🥧', [['flour',1],['egg',2],['cream',1],['sugar',1]]),

        // ──────────────────────────────────────────
        // 22. 멕시코음식점 (12개)
        // ──────────────────────────────────────────
        R('타코',         'mexican', '🌮', [['tortilla',1],['beef',1],['lettuce',1],['salsa',1]]),
        R('부리또',       'mexican', '🌯', [['tortilla',1],['rice',1],['beef',1],['bean',1],['cheese',1]]),
        R('퀘사디아',     'mexican', '🧀', [['tortilla',1],['cheese',2],['chicken_m',1],['salsa',1]]),
        R('나초',         'mexican', '🫓', [['nacho',2],['cheese',1],['salsa',1],['avocado',1]]),
        R('엔칠라다',     'mexican', '🌶️', [['tortilla',2],['chicken_m',1],['cheese',1],['chili',1]]),
        R('파히타',       'mexican', '🥩', [['tortilla',1],['beef',1],['pepper',1],['onion',1]]),
        R('치킨타코',     'mexican', '🌮', [['tortilla',1],['chicken_m',1],['lettuce',1],['lime',1]]),
        R('과카몰리',     'mexican', '🥑', [['avocado',2],['tomato',1],['onion',1],['lime',1]]),
        R('치미창가',     'mexican', '🌯', [['tortilla',1],['beef',1],['cheese',1],['bean',1],['batter',1]]),
        R('엘로테',       'mexican', '🌽', [['corn',2],['mayo',1],['cheese',1],['chili',1]]),
        R('멕시칸라이스', 'mexican', '🍚', [['rice',1],['tomato',1],['onion',1],['garlic',1]]),
        R('소파피야',     'mexican', '🍯', [['flour',2],['honey',1],['cinnamon',1]]),

        // ──────────────────────────────────────────
        // 23. 해산물집 (12개)
        // ──────────────────────────────────────────
        R('해물탕',       'seafood', '🍲', [['shrimp',1],['crab',1],['clam',1],['squid',1],['vegetable',1]]),
        R('랍스터구이',   'seafood', '🦞', [['crab',2],['butter',1],['garlic',1],['lemon',1]]),
        R('조개찜',       'seafood', '🐚', [['clam',3],['garlic',1],['greenonion',1]]),
        R('새우튀김',     'seafood', '🦐', [['shrimp',3],['batter',1],['flour',1]]),
        R('회덮밥',       'seafood', '🐟', [['rice',1],['salmon',1],['tuna',1],['vegetable',1]]),
        R('연어구이',     'seafood', '🍣', [['salmon',2],['lemon',1],['butter',1]]),
        R('문어숙회',     'seafood', '🐙', [['octopus',2],['vinegar',1],['gochujang',1]]),
        R('대하구이',     'seafood', '🦐', [['shrimp',3],['salt',1],['lemon',1]]),
        R('해물전',       'seafood', '🥞', [['flour',2],['shrimp',1],['squid',1],['greenonion',1]]),
        R('오징어볶음',   'seafood', '🦑', [['squid',2],['gochujang',1],['onion',1],['vegetable',1]]),
        R('생선까스',     'seafood', '🐟', [['tuna',2],['batter',1],['flour',1],['cabbage',1]]),
        R('꽃게찜',       'seafood', '🦀', [['crab',2],['gochujang',1],['garlic',1],['greenonion',1]]),

        // ──────────────────────────────────────────
        // 24. 면전문점 (12개)
        // ──────────────────────────────────────────
        R('칼국수',     'noodle', '🍜', [['flour',2],['clam',1],['zucchini',1],['garlic',1]]),
        R('잔치국수',   'noodle', '🍜', [['udon',1],['vegetable',1],['soy',1],['egg',1]]),
        R('비빔국수',   'noodle', '🌶️', [['udon',1],['gochujang',1],['vegetable',1],['vinegar',1]]),
        R('물냉면',     'noodle', '🧊', [['soba',1],['beef',1],['egg',1],['vinegar',1],['ice',1]]),
        R('비빔냉면',   'noodle', '🌶️', [['soba',1],['gochujang',1],['egg',1],['cucumber',1]]),
        R('쟁반국수',   'noodle', '🍜', [['udon',1],['vegetable',2],['gochujang',1]]),
        R('수제비',     'noodle', '🍲', [['flour',2],['potato',1],['zucchini',1],['garlic',1]]),
        R('콩국수',     'noodle', '🥛', [['udon',1],['bean',2],['cucumber',1],['ice',1]]),
        R('쌀국수',     'noodle', '🍜', [['ricepaper',1],['beef',1],['sprout',1],['lime',1],['fishsauce',1]]),
        R('우동(면집)', 'noodle', '🍜', [['udon',1],['soy',1],['greenonion',1],['mushroom',1]]),
        R('막국수',     'noodle', '🍜', [['soba',1],['gochujang',1],['radish',1],['vinegar',1]]),
        R('들깨칼국수', 'noodle', '🍜', [['flour',2],['sesame',2],['mushroom',1],['zucchini',1]]),

        // ──────────────────────────────────────────
        // 25. 디저트카페 (15개)
        // ──────────────────────────────────────────
        R('딸기케이크',     'dessert', '🍰', [['strawberry',3],['cream',2],['flour',2],['egg',1]]),
        R('초콜릿케이크',   'dessert', '🍫', [['chocolate',2],['flour',2],['egg',2],['cream',1]]),
        R('마카롱',         'dessert', '🎨', [['almond',2],['sugar',2],['egg',1]]),
        R('치즈케이크',     'dessert', '🧀', [['cheese',2],['cream',2],['egg',1]]),
        R('티라미수',       'dessert', '☕', [['coffee',1],['cream',2],['egg',1],['chocolate',1]]),
        R('크레이프',       'dessert', '🥞', [['flour',1],['egg',1],['milk',1],['cream',1],['strawberry',1]]),
        R('브라우니',       'dessert', '🍫', [['chocolate',2],['butter',1],['egg',1],['flour',1]]),
        R('팬케이크',       'dessert', '🥞', [['flour',2],['egg',1],['milk',1],['syrup',1]]),
        R('푸딩',           'dessert', '🍮', [['milk',1],['egg',2],['sugar',1],['vanilla',1]]),
        R('슈크림',         'dessert', '🧁', [['flour',1],['egg',1],['cream',2],['butter',1]]),
        R('에클레어',       'dessert', '🥖', [['flour',1],['egg',1],['cream',1],['chocolate',1]]),
        R('타르트',         'dessert', '🥧', [['flour',1],['butter',1],['egg',1],['strawberry',2]]),
        R('와플',           'dessert', '🧇', [['waffle_d',1],['cream',1],['strawberry',1],['syrup',1]]),
        R('말차케이크',     'dessert', '🍵', [['matcha',2],['cream',2],['flour',1],['egg',1]]),
        R('레몬타르트',     'dessert', '🍋', [['flour',1],['butter',1],['lemon',2],['sugar',1]]),

        // ──────────────────────────────────────────
        // 26. 카페 (15개)
        // ──────────────────────────────────────────
        R('아메리카노',     'cafe', '☕', [['coffee',1],['water',1]]),
        R('카페라떼',       'cafe', '☕', [['coffee',1],['milk',1]]),
        R('카푸치노',       'cafe', '☕', [['coffee',1],['milk',1],['cream',1]]),
        R('바닐라라떼',     'cafe', '🍦', [['coffee',1],['milk',1],['vanilla',1]]),
        R('카라멜마끼아또', 'cafe', '🟫', [['coffee',1],['milk',1],['caramel',1]]),
        R('모카',           'cafe', '🍫', [['coffee',1],['milk',1],['chocolate',1]]),
        R('말차라떼',       'cafe', '🍵', [['matcha',1],['milk',1]]),
        R('아이스티',       'cafe', '🧊', [['greentea',1],['lemon',1],['ice',1],['sugar',1]]),
        R('핫초코',         'cafe', '🍫', [['chocolate',1],['milk',1],['cream',1]]),
        R('딸기스무디',     'cafe', '🍓', [['strawberry',2],['yogurt',1],['ice',1]]),
        R('망고스무디',     'cafe', '🥭', [['mango',2],['yogurt',1],['ice',1]]),
        R('블루베리스무디', 'cafe', '🫐', [['blueberry',2],['yogurt',1],['ice',1]]),
        R('아포가토',       'cafe', '🍦', [['coffee',1],['icecream_b',1]]),
        R('에스프레소',     'cafe', '☕', [['coffee',2]]),
        R('아인슈패너',     'cafe', '☕', [['coffee',1],['cream',2]]),

        // ──────────────────────────────────────────
        // 27. 베이커리 (15개)
        // ──────────────────────────────────────────
        R('크루아상',       'bakery', '🥐', [['croissant_d',2],['butter',2]]),
        R('식빵',           'bakery', '🍞', [['flour',3],['butter',1],['milk',1],['sugar',1]]),
        R('바게트',         'bakery', '🥖', [['flour',3],['salt',1],['water',1]]),
        R('소금빵',         'bakery', '🧂', [['flour',2],['butter',2],['salt',1]]),
        R('단팥빵',         'bakery', '🫘', [['flour',2],['redbean',2],['sugar',1]]),
        R('크림빵',         'bakery', '🧁', [['flour',2],['cream',2],['vanilla',1]]),
        R('초코빵',         'bakery', '🍫', [['flour',2],['chocolate',2],['butter',1]]),
        R('베이글',         'bakery', '🥯', [['flour',2],['egg',1],['sugar',1]]),
        R('머핀',           'bakery', '🧁', [['flour',1],['egg',1],['butter',1],['blueberry',1]]),
        R('스콘',           'bakery', '🫓', [['flour',2],['butter',1],['cream',1],['jam',1]]),
        R('시나몬롤',       'bakery', '🍩', [['flour',2],['cinnamon',2],['sugar',1],['butter',1]]),
        R('호두파이',       'bakery', '🥧', [['flour',1],['butter',1],['almond',2],['honey',1]]),
        R('마늘빵',         'bakery', '🧄', [['bun',1],['garlic',2],['butter',2]]),
        R('치아바타',       'bakery', '🥖', [['flour',2],['oliveoil',1],['salt',1]]),
        R('브리오슈',       'bakery', '🧁', [['flour',2],['butter',2],['egg',2],['sugar',1]]),

        // ──────────────────────────────────────────
        // 28. 아이스크림가게 (12개)
        // ──────────────────────────────────────────
        R('바닐라아이스크림',  'icecream', '🍦', [['icecream_b',1],['vanilla',1],['milk',1]]),
        R('초콜릿아이스크림',  'icecream', '🍫', [['icecream_b',1],['chocolate',2],['milk',1]]),
        R('딸기아이스크림',    'icecream', '🍓', [['icecream_b',1],['strawberry',2],['cream',1]]),
        R('말차아이스크림',    'icecream', '🍵', [['icecream_b',1],['matcha',1],['milk',1]]),
        R('망고소르베',        'icecream', '🥭', [['mango',2],['sugar',1],['lime',1]]),
        R('블루베리소르베',    'icecream', '🫐', [['blueberry',2],['sugar',1],['lemon',1]]),
        R('쿠키앤크림',        'icecream', '🍪', [['icecream_b',1],['chocolate',1],['cream',1],['flour',1]]),
        R('민트초코',          'icecream', '🍫', [['icecream_b',1],['chocolate',1],['matcha',1]]),
        R('피스타치오',        'icecream', '🌰', [['icecream_b',1],['almond',2],['cream',1]]),
        R('레몬소르베',        'icecream', '🍋', [['lemon',2],['sugar',1],['water',1]]),
        R('카라멜아이스크림',  'icecream', '🟫', [['icecream_b',1],['caramel',2],['cream',1]]),
        R('팥빙수',            'icecream', '🍧', [['ice',2],['redbean',2],['milk',1],['ricecake',1]]),

        // ──────────────────────────────────────────
        // 29. 주스가게 (12개)
        // ──────────────────────────────────────────
        R('오렌지주스',     'juice', '🍊', [['orange',3],['ice',1]]),
        R('딸기주스',       'juice', '🍓', [['strawberry',3],['milk',1],['ice',1]]),
        R('망고주스',       'juice', '🥭', [['mango',2],['ice',1],['milk',1]]),
        R('수박주스',       'juice', '🍉', [['watermelon',2],['ice',1]]),
        R('바나나밀크',     'juice', '🍌', [['banana',2],['milk',1],['honey',1]]),
        R('사과당근주스',   'juice', '🍎', [['apple',2],['carrot',1]]),
        R('키위주스',       'juice', '🥝', [['kiwi',2],['ice',1],['honey',1]]),
        R('블루베리스무디(주)','juice','🫐',[['blueberry',2],['yogurt',1],['honey',1]]),
        R('아사이볼',       'juice', '🫐', [['blueberry',1],['banana',1],['yogurt',1],['oat',1]]),
        R('복숭아아이스티', 'juice', '🍑', [['peach',2],['greentea',1],['ice',1],['sugar',1]]),
        R('레모네이드',     'juice', '🍋', [['lemon',2],['sugar',1],['water',1],['ice',1]]),
        R('포도주스',       'juice', '🍇', [['grape',3],['ice',1]]),

        // ──────────────────────────────────────────
        // 30. 핫도그가게 (10개)
        // ──────────────────────────────────────────
        R('클래식핫도그',   'hotdog', '🌭', [['hotdog_bun',1],['sausage',1],['ketchup',1],['mustard',1]]),
        R('치즈핫도그',     'hotdog', '🧀', [['hotdog_bun',1],['sausage',1],['cheese',2]]),
        R('감자핫도그',     'hotdog', '🥔', [['hotdog_bun',1],['sausage',1],['potato',2],['batter',1]]),
        R('모짜렐라핫도그', 'hotdog', '🧀', [['hotdog_bun',1],['sausage',1],['mozzarella',2],['batter',1]]),
        R('칠리핫도그',     'hotdog', '🌶️', [['hotdog_bun',1],['sausage',1],['chili',1],['onion',1]]),
        R('베이컨핫도그',   'hotdog', '🥓', [['hotdog_bun',1],['sausage',1],['bacon',2]]),
        R('크리스피핫도그', 'hotdog', '🌭', [['hotdog_bun',1],['sausage',1],['batter',2],['cornmeal',1]]),
        R('새우핫도그',     'hotdog', '🦐', [['hotdog_bun',1],['shrimp',2],['batter',1]]),
        R('더블핫도그',     'hotdog', '🌭', [['hotdog_bun',1],['sausage',2],['cheese',1],['ketchup',1]]),
        R('와플핫도그',     'hotdog', '🧇', [['waffle_d',1],['sausage',1],['cheese',1],['sugar',1]])
    ];

    // ─────── 통계 ───────
    console.log(`✅ EXPANDED_SHOP_DATA 로드: ${shopTypes.length}개 업종, ${ingredients.length}개 재료, ${recipes.length}개 레시피`);

    return { shopTypes, ingredients, recipes };
})();
