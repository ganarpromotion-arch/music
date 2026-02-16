// ==================== 데이터 관리 시스템 ====================
const DataManager = (function() {
    'use strict';

    // ==================== 기본 데이터 (shop-data-30.js 우선 사용) ====================
    function getDefaultData() {
        // shop-data-30.js가 로드되어 있으면 그쪽 데이터 사용
        if (typeof EXPANDED_SHOP_DATA !== 'undefined') {
            return {
                shopTypes: EXPANDED_SHOP_DATA.shopTypes,
                ingredients: EXPANDED_SHOP_DATA.ingredients,
                recipes: EXPANDED_SHOP_DATA.recipes,
                questions: [
                    { id: 1, question: '2 + 2 = ?', options: ['4','3','5','6'], correctIndex: 0, difficulty: 'easy', category: 'math', reward: 10 },
                    { id: 2, question: '5 × 3 = ?', options: ['15','10','20','12'], correctIndex: 0, difficulty: 'easy', category: 'math', reward: 10 },
                    { id: 3, question: '10 - 7 = ?', options: ['3','4','2','5'], correctIndex: 0, difficulty: 'easy', category: 'math', reward: 10 },
                    { id: 4, question: '8 ÷ 2 = ?', options: ['4','2','6','8'], correctIndex: 0, difficulty: 'easy', category: 'math', reward: 10 },
                    { id: 5, question: '대한민국의 수도는?', options: ['서울','부산','대구','인천'], correctIndex: 0, difficulty: 'easy', category: 'general', reward: 10 },
                    { id: 6, question: '태양계에서 가장 큰 행성은?', options: ['목성','토성','지구','화성'], correctIndex: 0, difficulty: 'medium', category: 'science', reward: 15 },
                    { id: 7, question: '물의 화학식은?', options: ['H2O','CO2','O2','N2'], correctIndex: 0, difficulty: 'easy', category: 'science', reward: 10 },
                    { id: 8, question: '1년은 몇 개월?', options: ['12개월','10개월','11개월','13개월'], correctIndex: 0, difficulty: 'easy', category: 'general', reward: 10 }
                ]
            };
        }
        // 폴백: 기존 기본 데이터
        return DEFAULT_DATA_FALLBACK;
    }

    const DEFAULT_DATA_FALLBACK = {
        shopTypes: [
            { id: 'dessert', name: '디저트 카페', emoji: '🍰', addCost: 300 },
            { id: 'korean', name: '한식당', emoji: '🍚', addCost: 300 },
            { id: 'pasta', name: '파스타 전문점', emoji: '🍝', addCost: 500 },
            { id: 'chicken', name: '치킨집', emoji: '🍗', addCost: 500 },
            { id: 'pizza', name: '피자가게', emoji: '🍕', addCost: 700 },
            { id: 'burger', name: '버거집', emoji: '🍔', addCost: 700 }
        ],
        ingredients: [],
        recipes: [],
        questions: []
    };

    // ==================== 초기화 ====================
    function init() {
        // ⚠️ 중요: 기존 gameData가 있으면 덮어쓰지 않음 (추가/수정한 데이터 보존)
        // - 최초 1회만 기본 데이터로 시드
        // - 이미 저장된 데이터가 있는 경우: 누락된 필드만 기본값으로 보강
        const stored = localStorage.getItem('gameData');
        const dd = getDefaultData();

        if (!stored) {
            saveAll(dd);
            console.log('✅ 기본 데이터 최초 시드 완료');
            return;
        }

        try {
            const cur = JSON.parse(stored);
            const merged = {
                shopTypes: Array.isArray(cur.shopTypes) ? cur.shopTypes : dd.shopTypes,
                ingredients: Array.isArray(cur.ingredients) ? cur.ingredients : dd.ingredients,
                recipes: Array.isArray(cur.recipes) ? cur.recipes : dd.recipes,
                questions: Array.isArray(cur.questions) ? cur.questions : dd.questions
            };
            // 혹시 다른 확장 필드가 들어있다면 유지
            for (const k in cur) {
                if (!(k in merged)) merged[k] = cur[k];
            }
            saveAll(merged);
            console.log('✅ 기존 데이터 유지 + 누락 필드 보강 완료');
        } catch (e) {
            // 저장 데이터가 깨진 경우에만 기본값으로 복구
            saveAll(dd);
            console.warn('⚠️ gameData 파싱 실패. 기본 데이터로 복구:', e);
        }
    }

    // ==================== 전체 데이터 ====================
    function getAll() {
        const data = localStorage.getItem('gameData');
        return data ? JSON.parse(data) : getDefaultData();
    }

    function saveAll(data) {
        localStorage.setItem('gameData', JSON.stringify(data));
    }

    // ==================== 식당 종류 ====================
    function getShopTypes() {
        return getAll().shopTypes;
    }

    function getShopType(id) {
        return getShopTypes().find(s => s.id === id);
    }

    function addShopType(shopType) {
        const data = getAll();
        shopType.id = shopType.id || shopType.name.toLowerCase().replace(/\s+/g, '_');
        data.shopTypes.push(shopType);
        saveAll(data);
        return shopType;
    }

    function updateShopType(id, updates) {
        const data = getAll();
        const index = data.shopTypes.findIndex(s => s.id === id);
        if (index !== -1) {
            data.shopTypes[index] = { ...data.shopTypes[index], ...updates };
            saveAll(data);
            return data.shopTypes[index];
        }
        return null;
    }

    function deleteShopType(id) {
        const data = getAll();
        data.shopTypes = data.shopTypes.filter(s => s.id !== id);
        // 해당 식당의 레시피도 삭제
        data.recipes = data.recipes.filter(r => r.shopType !== id);
        saveAll(data);
    }

    // ==================== 재료 ====================
    function getIngredients() {
        return getAll().ingredients;
    }

    function getIngredient(id) {
        return getIngredients().find(i => i.id === id);
    }

    function addIngredient(ingredient) {
        const data = getAll();
        ingredient.id = ingredient.id || ingredient.name.toLowerCase().replace(/\s+/g, '_');
        data.ingredients.push(ingredient);
        saveAll(data);
        return ingredient;
    }

    function updateIngredient(id, updates) {
        const data = getAll();
        const index = data.ingredients.findIndex(i => i.id === id);
        if (index !== -1) {
            data.ingredients[index] = { ...data.ingredients[index], ...updates };
            saveAll(data);
            return data.ingredients[index];
        }
        return null;
    }

    function deleteIngredient(id) {
        const data = getAll();
        data.ingredients = data.ingredients.filter(i => i.id !== id);
        // 해당 재료를 사용하는 레시피에서 제거
        data.recipes.forEach(recipe => {
            recipe.ingredients = recipe.ingredients.filter(ing => ing.ingredientId !== id);
        });
        saveAll(data);
    }

    // ==================== 레시피 ====================
    function getRecipes(shopType = null) {
        const recipes = getAll().recipes;
        return shopType ? recipes.filter(r => r.shopType === shopType) : recipes;
    }

    function getRecipe(id) {
        return getAll().recipes.find(r => r.id === id);
    }

    // ==================== 적정가 계산 ====================
    // 레시피의 재료 원가 합산 * 설정 배율(있으면)로 적정가를 계산합니다.
    // - ingredient.price가 없으면 0 처리
    // - amount는 숫자로 강제 변환
    function calculateFairPrice(recipeId) {
        const recipe = getRecipe(recipeId);
        if (!recipe || !Array.isArray(recipe.ingredients)) return 0;

        let total = 0;
        for (const ing of recipe.ingredients) {
            const ingredientId = ing.ingredientId || ing.id;
            const amount = Number(ing.amount || 0) || 0;
            const meta = getIngredient(ingredientId);
            const unitPrice = meta && typeof meta.price === 'number' ? meta.price : 0;
            total += unitPrice * amount;
        }

        // 설정 배율 (없으면 1)
        let mul = 1;
        try {
            if (typeof GameSettings !== 'undefined' && GameSettings.getRecipePriceMultiplier) {
                mul = Number(GameSettings.getRecipePriceMultiplier()) || 1;
            }
        } catch (e) {}

        const fair = Math.max(0, Math.round(total * mul));
        return fair;
    }


    function addRecipe(recipe) {
        const data = getAll();
        recipe.id = Date.now(); // 고유 ID
        recipe.createdAt = Date.now();
        data.recipes.push(recipe);
        saveAll(data);
        return recipe;
    }

    function updateRecipe(id, updates) {
        const data = getAll();
        const index = data.recipes.findIndex(r => r.id === id);
        if (index !== -1) {
            data.recipes[index] = { ...data.recipes[index], ...updates };
            saveAll(data);
            return data.recipes[index];
        }
        return null;
    }

    function deleteRecipe(id) {
        const data = getAll();
        data.recipes = data.recipes.filter(r => r.id !== id);
        saveAll(data);
    }

    // 레시피 제작 비용 계산
    function calculateRecipeCost(recipeId) {
        const recipe = getRecipe(recipeId);
        if (!recipe) return 0;
        
        return recipe.ingredients.reduce((total, ing) => {
            const ingredient = getIngredient(ing.ingredientId);
            return total + (ingredient ? ingredient.price * ing.amount : 0);
        }, 0);
    }

    // ==================== 문제 ====================
    function getQuestions(difficulty = null, category = null) {
        let questions = getAll().questions;
        if (difficulty) questions = questions.filter(q => q.difficulty === difficulty);
        if (category) questions = questions.filter(q => q.category === category);
        return questions;
    }

    function getQuestion(id) {
        return getAll().questions.find(q => q.id === id);
    }

    function getRandomQuestion(difficulty = null) {
        const questions = getQuestions(difficulty);
        return questions[Math.floor(Math.random() * questions.length)];
    }

    function addQuestion(question) {
        const data = getAll();
        question.id = Date.now();
        question.createdAt = Date.now();
        data.questions.push(question);
        saveAll(data);
        return question;
    }

    function updateQuestion(id, updates) {
        const data = getAll();
        const index = data.questions.findIndex(q => q.id === id);
        if (index !== -1) {
            data.questions[index] = { ...data.questions[index], ...updates };
            saveAll(data);
            return data.questions[index];
        }
        return null;
    }

    function deleteQuestion(id) {
        const data = getAll();
        data.questions = data.questions.filter(q => q.id !== id);
        saveAll(data);
    }

    // ==================== 데이터 관리 ====================
    function resetToDefault() {
        saveAll(getDefaultData());
        console.log('✅ 기본 데이터로 초기화됨');
    }

    function exportData() {
        return JSON.stringify(getAll(), null, 2);
    }

    function importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            saveAll(data);
            return { success: true, message: '데이터 가져오기 성공' };
        } catch (e) {
            return { success: false, message: '잘못된 JSON 형식: ' + e.message };
        }
    }

    // ==================== Public API ====================
    return {
        init,
        getAll,
        saveAll,
        
        // 식당
        getShopTypes,
        getShopType,
        addShopType,
        updateShopType,
        deleteShopType,
        
        // 재료
        getIngredients,
        getIngredient,
        addIngredient,
        updateIngredient,
        deleteIngredient,
        
        // 레시피
        getRecipes,
        getRecipe,
        calculateFairPrice,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        calculateRecipeCost,
        
        // 문제
        getQuestions,
        getQuestion,
        getRandomQuestion,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        
        // 관리
        resetToDefault,
        exportData,
        importData
    };
})();

// 자동 초기화
DataManager.init();
console.log('✅ DataManager 로드 완료');
