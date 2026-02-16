// ==================== 문제 은행 (그룹별/과목별 50문제) ====================
// 요구사항:
// - 나이 5~13을 3개 그룹으로 묶어서 "비슷한 나이"가 문제를 공유
//   young: 5~7, child: 8~10, teen: 11~13
// - 과목별 50문제 (math / science(OX) / common(4지선다))
// - QuestionBank.getQuestion(subject, group, index)
// - QuestionBank.getTotalQuestions(subject, group)
// NewQuestionSystem.js에서 그대로 사용

const QuestionBank = (function() {
  'use strict';

  const TOTAL = 50;
  const SUBJECTS = ['math', 'science', 'common'];
  const GROUPS = ['young', 'child', 'teen', 'adult'];

  // -------------------- deterministic RNG --------------------
  // xorshift32
  function makeRng(seed) {
    let x = seed >>> 0;
    return function() {
      x ^= x << 13; x >>>= 0;
      x ^= x >>> 17; x >>>= 0;
      x ^= x << 5;  x >>>= 0;
      return (x >>> 0) / 4294967296;
    };
  }

  function hashStr(s) {
    // FNV-1a 32bit
    let h = 2166136261 >>> 0;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function seeded(subject, group, index) {
    return makeRng(hashStr(`${subject}|${group}|${index}|v1`));
  }

  function pick(rng, arr) {
    return arr[Math.floor(rng() * arr.length)];
  }

  function shuffle(rng, arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // -------------------- generators --------------------
  function genMath(group, index) {
    const rng = seeded('math', group, index);
    const level = (group === 'young') ? 1 : (group === 'child') ? 2 : (group === 'teen') ? 3 : 3;

    const ops = (level === 1) ? ['+'] : (level === 2) ? ['+','-'] : ['+','-','×'];
    const op = pick(rng, ops);

    const maxA = (level === 1) ? 10 : (level === 2) ? 50 : 99;
    const maxB = (level === 1) ? 10 : (level === 2) ? 30 : 20;

    let a = Math.floor(rng() * maxA) + 1;
    let b = Math.floor(rng() * maxB) + 1;
    let ans;

    if (op === '+') ans = a + b;
    if (op === '-') {
      if (b > a) [a, b] = [b, a];
      ans = a - b;
    }
    if (op === '×') ans = a * b;

    return {
      id: `math_${group}_${index}`,
      subject: '수학',
      type: 'input',
      q: `${a} ${op} ${b} = ?`,
      a: String(ans),
      meta: { group }
    };
  }

  const SCIENCE_FACTS = [
    { q: '물은 0도에서 얼 수 있다.', a: 'O' },
    { q: '해는 동쪽에서 뜬다.', a: 'O' },
    { q: '지구는 태양 주위를 돈다.', a: 'O' },
    { q: '식물은 햇빛이 필요하다.', a: 'O' },
    { q: '사람은 숨을 쉬어야 살 수 있다.', a: 'O' },
    { q: '달은 스스로 빛을 낸다.', a: 'X' },
    { q: '얼음은 뜨겁다.', a: 'X' },
    { q: '고래는 물고기이다.', a: 'X' },
    { q: '비는 땅에서 올라온다.', a: 'X' },
    { q: '모든 새는 날 수 있다.', a: 'X' },
    { q: '번개는 빛보다 느리다.', a: 'X' },
    { q: '사막에는 물이 전혀 없다.', a: 'X' },
  ];

  function genScience(group, index) {
    const rng = seeded('science', group, index);
    // group별로 문장 약간 다르게
    const base = pick(rng, SCIENCE_FACTS);
    const prefix = (group === 'teen' || group === 'adult') ? '[과학] ' : '';
    const suffix = (group === 'young') ? '' : (rng() < 0.35 ? ' (OX)' : '');
    return {
      id: `science_${group}_${index}`,
      subject: '과학',
      type: 'ox',
      q: `${prefix}${base.q}${suffix}`,
      a: base.a,
      meta: { group }
    };
  }

  const COMMON_QA = [
    { q: '대한민국의 수도는?', correct: '서울', wrong: ['부산', '대구', '인천'] },
    { q: '1년은 몇 달?', correct: '12달', wrong: ['10달', '6달', '20달'] },
    { q: '무지개는 보통 몇 가지 색?', correct: '7', wrong: ['3', '5', '10'] },
    { q: '아침에 해가 뜨는 방향은?', correct: '동쪽', wrong: ['서쪽', '남쪽', '북쪽'] },
    { q: '사람의 심장은 몸의 어느 쪽에 더 가까울까?', correct: '왼쪽', wrong: ['오른쪽', '가운데', '등'] },
    { q: '물을 끓이면 생기는 것은?', correct: '수증기', wrong: ['모래', '나무', '바람'] },
    { q: '하루는 몇 시간?', correct: '24시간', wrong: ['12시간', '48시간', '100시간'] },
    { q: '봄 다음 계절은?', correct: '여름', wrong: ['가을', '겨울', '밤'] },
    { q: '신호등의 빨간불 의미는?', correct: '멈춤', wrong: ['출발', '천천히', '점프'] },
    { q: '지구의 위성은?', correct: '달', wrong: ['별', '태양', '구름'] },
    { q: '세모(△)의 변은 몇 개?', correct: '3개', wrong: ['2개', '4개', '5개'] },
    { q: '네모(□)의 꼭짓점은 몇 개?', correct: '4개', wrong: ['3개', '5개', '6개'] },
  ];

  function genCommon(group, index) {
    const rng = seeded('common', group, index);
    const base = pick(rng, COMMON_QA);
    const choices = shuffle(rng, [base.correct, ...base.wrong]);
    const correctIndex = choices.indexOf(base.correct);
    const qSuffix = (group === 'teen' || group === 'adult') && rng() < 0.25 ? ' (객관식)' : '';
    return {
      id: `common_${group}_${index}`,
      subject: '상식',
      type: 'choice',
      q: `${base.q}${qSuffix}`,
      c: choices,
      a: correctIndex,
      meta: { group }
    };
  }

  // -------------------- public API --------------------
  function getQuestion(subject, group, index) {
    if (!SUBJECTS.includes(subject)) return null;
    if (!GROUPS.includes(group)) return null;
    if (typeof index !== 'number' || index < 0 || index >= TOTAL) return null;

    if (subject === 'math') return genMath(group, index);
    if (subject === 'science') return genScience(group, index);
    return genCommon(group, index);
  }

  function getTotalQuestions(subject, group) {
    if (!SUBJECTS.includes(subject)) return 0;
    if (!GROUPS.includes(group)) return 0;
    return TOTAL;
  }

  return { getQuestion, getTotalQuestions };
})();