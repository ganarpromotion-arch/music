// ==================== Firebase 온라인 인증 시스템 ====================
// device-auth-simple.js 대신 이 파일을 사용하세요
// API가 동일하므로 나머지 코드 변경 불필요!
const DeviceAuth = (function() {
    'use strict';

    // ──────────────────────────────────────────
    // ⚠️ 여기에 본인의 Firebase 설정을 넣으세요!
    // Firebase Console → 프로젝트 설정 → 웹 앱에서 복사
    // ──────────────────────────────────────────
    const firebaseConfig = {
        apiKey: "AIzaSyDgy09QSU8U2fQZ33CN5YDIiIqt-by8XWg",
        authDomain: "make-town.firebaseapp.com",
        databaseURL: "https://make-town-default-rtdb.firebaseio.com",
        projectId: "make-town",
        storageBucket: "make-town.firebasestorage.app",
        messagingSenderId: "775794446232",
        appId: "1:775794446232:web:df456e17d3348a8de665ed"
    };

    // Firebase 초기화
    let db = null;
    let usersRef = null;
    let _cache = {};          // 로컬 캐시 (동기 읽기용)
    let _ready = false;       // 초기 로드 완료 여부
    let _readyCallbacks = []; // 로드 완료 콜백

    function initFirebase() {
        try {
            // Firebase가 이미 초기화되었는지 확인
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            db = firebase.database();
            usersRef = db.ref('users');

            // 실시간 동기화 리스너
            // ⚠️ 읽기 권한/네트워크 문제로 'value'가 호출되지 않는 경우가 있어,
            // 에러 콜백에서 로컬 폴백 + ready 처리까지 확정한다.
            usersRef.on('value', (snapshot) => {
                const data = snapshot.val();
                _cache = data || {};
                
                // localStorage에도 백업 (오프라인 대비)
                try { localStorage.setItem('allUsers', JSON.stringify(_cache)); } catch(e) {}
                
                if (!_ready) {
                    _ready = true;
                    console.log('✅ Firebase 데이터 로드 완료 (' + Object.keys(_cache).length + '명)');
                    _readyCallbacks.forEach(cb => cb());
                    _readyCallbacks = [];
                }

                // 게임 화면 갱신 (다른 유저 변경 반영)
                if (window.currentUser && window.renderAll) {
                    try { window.renderAll(); } catch(e) {}
                }
            }, (err) => {
                console.error('❌ Firebase users 읽기 실패:', err);
                // 오프라인/권한 폴백: localStorage 사용
                try {
                    const local = localStorage.getItem('allUsers');
                    _cache = local ? JSON.parse(local) : {};
                } catch (e) {
                    _cache = {};
                }
                // ready 확정
                if (!_ready) {
                    _ready = true;
                    _readyCallbacks.forEach(cb => cb());
                    _readyCallbacks = [];
                }
            });

            console.log('✅ Firebase 연결 완료');
        } catch(e) {
            console.error('❌ Firebase 초기화 실패:', e);
            // 오프라인 폴백: localStorage 사용
            const local = localStorage.getItem('allUsers');
            _cache = local ? JSON.parse(local) : {};
            _ready = true;
        }
    }

    // 데이터 준비 완료 시 콜백
    function onReady(callback) {
        if (_ready) { callback(); }
        else { _readyCallbacks.push(callback); }
    }

    // ──────── 기존 API (동일한 인터페이스) ────────

    function getAllUsers() {
        return JSON.parse(JSON.stringify(_cache)); // deep copy
    }

    function saveAllUsers(users) {
        _cache = JSON.parse(JSON.stringify(users));
        try { localStorage.setItem('allUsers', JSON.stringify(_cache)); } catch(e) {}
        // Firebase에 저장
        if (usersRef) {
            usersRef.set(_cache).catch(e => console.error('Firebase 저장 에러:', e));
        }
    }

    function saveUser(username, userData) {
        _cache[username] = JSON.parse(JSON.stringify(userData));
        try { localStorage.setItem('allUsers', JSON.stringify(_cache)); } catch(e) {}
        // 해당 유저만 업데이트
        if (usersRef) {
            usersRef.child(username).set(_cache[username])
                .catch(e => console.error('Firebase 유저 저장 에러:', e));
        }
    }

    function getUser(username) {
        const user = _cache[username];
        return user ? JSON.parse(JSON.stringify(user)) : undefined;
    }

    async function authenticate(username) {
        if (_cache[username]) {
            return { success: true, mode: 'login', message: `환영합니다, ${username}님!` };
        } else {
            const newUser = {
                username, deviceId: 'firebase', createdAt: Date.now(),
                gold: 500, inventory: {}, products: [], shop: null, shops: [],
                age: null, stats: { made: 0, sold: 0, bought: 0 }, salesHistory: []
            };
            _cache[username] = newUser;
            if (usersRef) {
                await usersRef.child(username).set(newUser);
            }
            try { localStorage.setItem('allUsers', JSON.stringify(_cache)); } catch(e) {}
            return { success: true, mode: 'signup', message: `회원가입 완료! ${username}님` };
        }
    }

    function getCurrentUser(username) {
        return getUser(username);
    }

    
    // ==================== 기기 고유 UUID ====================
    function getDeviceUUID() {
        try {
            let id = localStorage.getItem('deviceUUID');
            if (id) return id;
            // modern browsers
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                id = crypto.randomUUID();
            } else {
                // fallback UUIDv4-ish
                id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                    const r = Math.random() * 16 | 0;
                    const v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
            localStorage.setItem('deviceUUID', id);
            return id;
        } catch(e) {
            // localStorage 불가 환경이면 세션 기반
            return 'session-' + Date.now() + '-' + Math.floor(Math.random()*1e9);
        }
    }

// 초기화 실행
    initFirebase();

    return {
        authenticate,
        getCurrentUser,
        getUser,
        saveUser,
        getAllUsers,
        saveAllUsers,
        onReady  // 새로 추가: 데이터 로드 완료 대기
    };
})();

console.log('✅ DeviceAuth 로드 완료 (Firebase Version)');
