/* ============================================================
   Rohan's Final Cut — Auth Logic
   ============================================================ */
const RFC_AUTH = (() => {
  const KEY = 'rfc_auth_user';
  function getUser() {
    try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
  }
  function setUser(user) {
    localStorage.setItem(KEY, JSON.stringify(user));
  }
  function logout() {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent('rfc:auth-change'));
  }
  function isLoggedIn() {
    return !!getUser();
  }
  function getUsers() {
    try { return JSON.parse(localStorage.getItem('rfc_users') || '{}'); } catch { return {}; }
  }
  function saveUsers(users) {
    localStorage.setItem('rfc_users', JSON.stringify(users));
  }
  function register(username, email, password) {
    if (!username || !email || !password) return { ok: false, msg: 'All fields are required.' };
    if (username.length < 3) return { ok: false, msg: 'Username must be at least 3 characters.' };
    if (password.length < 6) return { ok: false, msg: 'Password must be at least 6 characters.' };
    const users = getUsers();
    if (users[username.toLowerCase()]) return { ok: false, msg: 'Username already taken.' };
    if (Object.values(users).some(u => u.email === email)) return { ok: false, msg: 'Email already registered.' };
    const user = { username, email, avatar: username[0].toUpperCase(), joinedAt: new Date().toISOString() };
    users[username.toLowerCase()] = { ...user, password };
    saveUsers(users);
    setUser(user);
    window.dispatchEvent(new CustomEvent('rfc:auth-change'));
    return { ok: true, user };
  }
  function login(username, password) {
    if (!username || !password) return { ok: false, msg: 'Please fill in all fields.' };
    const users = getUsers();
    const found = users[username.toLowerCase()];
    if (!found) return { ok: false, msg: 'User not found.' };
    if (found.password !== password) return { ok: false, msg: 'Incorrect password.' };
    const user = { username: found.username, email: found.email, avatar: found.avatar, joinedAt: found.joinedAt };
    setUser(user);
    window.dispatchEvent(new CustomEvent('rfc:auth-change'));
    return { ok: true, user };
  }
  return { getUser, logout, isLoggedIn, register, login };
})();
// ---- Modal controller ----
const AuthModal = (() => {
  let backdrop, loginForm, registerForm, errorEl, currentTab = 'login';
  function init() {
    backdrop = document.getElementById('auth-modal-backdrop');
    loginForm = document.getElementById('auth-login-form');
    registerForm = document.getElementById('auth-register-form');
    errorEl = document.getElementById('auth-error');
    // close on backdrop click
    backdrop.addEventListener('click', e => { if (e.target === backdrop) hide(); });
    document.getElementById('modal-close-btn').addEventListener('click', hide);
    // tab switching
    document.getElementById('modal-tab-login').addEventListener('click', () => switchTab('login'));
    document.getElementById('modal-tab-register').addEventListener('click', () => switchTab('register'));
    // auth-switch links
    document.getElementById('switch-to-register').addEventListener('click', () => switchTab('register'));
    document.getElementById('switch-to-login').addEventListener('click', () => switchTab('login'));
    // form submits
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    // ESC close
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && backdrop.classList.contains('visible')) hide(); });
  }
  function switchTab(tab) {
    currentTab = tab;
    document.getElementById('modal-tab-login').classList.toggle('active', tab === 'login');
    document.getElementById('modal-tab-register').classList.toggle('active', tab === 'register');
    loginForm.style.display = tab === 'login' ? 'block' : 'none';
    registerForm.style.display = tab === 'register' ? 'block' : 'none';
    clearError();
  }
  function show(tab = 'login') {
    backdrop.classList.add('visible');
    switchTab(tab);
    document.body.style.overflow = 'hidden';
  }
  function hide() {
    backdrop.classList.remove('visible');
    document.body.style.overflow = '';
    clearError();
  }
  function clearError() {
    errorEl.classList.remove('visible');
    errorEl.textContent = '';
  }
  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.classList.add('visible');
  }
  function handleLogin(e) {
    e.preventDefault();
    const u = document.getElementById('login-username').value.trim();
    const p = document.getElementById('login-password').value;
    const result = RFC_AUTH.login(u, p);
    if (result.ok) {
      hide();
      RFC_UI.showToast(`Welcome back, ${result.user.username}! 🎬`, 'success');
    } else {
      showError(result.msg);
    }
  }
  function handleRegister(e) {
    e.preventDefault();
    const u = document.getElementById('reg-username').value.trim();
    const em = document.getElementById('reg-email').value.trim();
    const p = document.getElementById('reg-password').value;
    const result = RFC_AUTH.register(u, em, p);
    if (result.ok) {
      hide();
      RFC_UI.showToast(`Account created! Welcome, ${result.user.username}! 🎉`, 'success');
    } else {
      showError(result.msg);
    }
  }
  return { init, show, hide, switchTab };
})();
