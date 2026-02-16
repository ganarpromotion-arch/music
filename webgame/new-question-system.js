// ==================== 새로운 문제 시스템 (중복 방지 개선) ====================
const NewQuestionSystem = (function() {
    'use strict';

    const WEEK_STORAGE = 'weeklyQuestions_v2';
    const REWARDS = {
        young: { correct: 5, wrong: -2 },
        child: { correct: 8, wrong: -2 },
        teen: { correct: 10, wrong: -2 },
        adult: { correct: 15, wrong: -2 }
    };

    // 나이 그룹 결정
    function getAgeGroup(age) {
        if (age >= 5 && age <= 7) return 'young';
        if (age >= 8 && age <= 10) return 'child';
        if (age >= 11 && age <= 13) return 'teen';
        return 'adult';
    }

    // 주의 시작일 (월요일 00:00)
    function getWeekStart() {
        const now = new Date();
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(now.setDate(diff));
        monday.setHours(0, 0, 0, 0);
        return monday.getTime();
    }

    // 이번 주 푼 문제
    function getWeeklySolved() {
        const weekStart = getWeekStart();
        const stored = localStorage.getItem(WEEK_STORAGE);
        
        if (!stored) return { weekStart, solved: [] };
        
        const data = JSON.parse(stored);
        
        // 새 주가 시작되면 리셋
        if (data.weekStart !== weekStart) {
            return { weekStart, solved: [] };
        }
        
        return data;
    }

    // 문제 푼 것으로 표시
    function markAsSolved(questionId) {
        const data = getWeeklySolved();
        if (!data.solved.includes(questionId)) {
            data.solved.push(questionId);
        }
        localStorage.setItem(WEEK_STORAGE, JSON.stringify(data));
    }

    
    // 부족할 때 사용할 절대 고갈되지 않는 생성기(연산/상식/단어)
    function generateProceduralQuestion(age, subject) {
        const group = getAgeGroup(age);
        // seed: 시간 기반 + subject + group
        const seed = Date.now() ^ (subject.length * 2654435761) ^ (group.length * 97);
        function rnd(n) { return Math.floor(Math.random() * n); }

        // 난이도 파라미터
        const maxA = (group === 'young') ? 10 : (group === 'child') ? 30 : 80;
        const maxB = (group === 'young') ? 10 : (group === 'child') ? 20 : 50;

        if (subject === 'math') {
            const opPick = (group === 'young') ? ['+'] : (group === 'child') ? ['+','-'] : ['+','-','×'];
            const op = opPick[rnd(opPick.length)];
            let a = rnd(maxA)+1, b = rnd(maxB)+1;
            let answer;
            if (op === '+') answer = a + b;
            if (op === '-') { if (b > a) [a,b] = [b,a]; answer = a - b; }
            if (op === '×') answer = a * b;
            return {
                id: `proc_math_${group}_${Date.now()}_${Math.random()}`,
                type: 'input',
                question: `${a} ${op} ${b} = ?`,
                answer: String(answer),
                subject: 'math',
                group
            };
        }

        // 상식(초등 저학년용 쉬운 OX)
        if (subject === 'general' || subject === 'common') {
            const facts = [
                { q:'해는 동쪽에서 뜬다.', a:true },
                { q:'물은 0도에서 얼 수 있다.', a:true },
                { q:'고양이는 보통 물고기를 좋아한다.', a:true },
                { q:'사과는 보통 나무에서 열린다.', a:true },
                { q:'달은 스스로 빛을 낸다.', a:false },
                { q:'1주일은 10일이다.', a:false },
                { q:'한국의 수도는 서울이다.', a:true },
                { q:'무지개는 보통 2가지 색만 있다.', a:false },
            ];
            const f = facts[rnd(facts.length)];
            return {
                id: `proc_common_${group}_${Date.now()}_${Math.random()}`,
                type: 'ox',
                question: f.q,
                answer: f.a ? 'O' : 'X',
                subject: 'common',
                group
            };
        }

        // 단어(낱말맞추기)
        const words = ['바다','하늘','사과','학교','친구','가게','요리','음악','게임','행복'];
        const w = words[rnd(words.length)];
        const masked = w[0] + ' _ '.repeat(Math.max(0, w.length-1)).trim();
        return {
            id: `proc_word_${group}_${Date.now()}_${Math.random()}`,
            type: 'input',
            question: `빈칸에 들어갈 말을 맞춰보세요: ${masked}`,
            answer: w,
            subject: 'word',
            group
        };
    }

// 랜덤 문제 생성 (문제 은행에서 가져오기)
    function generateQuestion(age, subject) {
        const group = getAgeGroup(age);
        const weekData = getWeeklySolved();
        
        // 해당 과목의 총 문제 수
        const totalQuestions = QuestionBank.getTotalQuestions(subject, group);
        if (totalQuestions < 20) {
            // 문제 수가 너무 적으면 생성기로 보충
            return generateProceduralQuestion(age, subject);
        }
        if (totalQuestions === 0) { return generateProceduralQuestion(age, subject); }

        // 안 푼 문제 찾기 (최대 100번 시도)
        let attempts = 0;
        let question = null;
        
        const tried = new Set();
        
        while (attempts < 100 && tried.size < totalQuestions) {
            const index = Math.floor(Math.random() * totalQuestions);
            const tempId = `${subject}_${group}_${index}`;
            
            if (tried.has(index)) {
                attempts++;
                continue;
            }
            
            tried.add(index);
            
            if (!weekData.solved.includes(tempId)) {
                question = QuestionBank.getQuestion(subject, group, index);
                if (question) {
                    console.log(`문제 생성: ${tempId} (시도 ${attempts + 1}번)`);
                    break;
                }
            }
            
            attempts++;
        }
        
        // 못 찾으면 랜덤
        if (!question) {
            const index = Math.floor(Math.random() * totalQuestions);
            question = QuestionBank.getQuestion(subject, group, index);
            console.log(`모든 문제 풀음! 랜덤 출제: ${subject}_${group}_${index}`);
        }

        return question;
    }

    // 보상
    function getReward(age, isCorrect) {
        const group = getAgeGroup(age);
        return isCorrect ? REWARDS[group].correct : REWARDS[group].wrong;
    }

    // 이번 주 통계
    function getWeeklyStats() {
        const data = getWeeklySolved();
        return {
            total: data.solved.length,
            weekStart: new Date(data.weekStart).toLocaleDateString()
        };
    }

    return {
        generateQuestion,
        markAsSolved,
        getReward,
        getWeeklyStats,
        getAgeGroup
    };
})();
