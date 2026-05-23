/* ============================================================
   Rohan's Final Cut — Reviews Logic
   ============================================================ */
const ReviewsController = (() => {
  let currentMovieId = null;
  let selectedRating = 0;
  function init(movieId) {
    currentMovieId = movieId;
    selectedRating = 0;
    renderWriteSection();
    renderReviews();
  }
  function renderStars(rating, size = 16) {
    let html = '';
    for (let i = 1; i <= 10; i++) {
      const filled = i <= rating;
      html += `<span class="review-star" style="color:${filled ? '#f5c518' : 'rgba(255,255,255,0.15)'}; font-size:${size}px;">★</span>`;
    }
    return html;
  }
  function renderWriteSection() {
    const wrap = document.getElementById('review-write-wrap');
    if (!wrap) return;
    const user = RFC_AUTH.getUser();
    if (user) {
      wrap.innerHTML = `
        <div class="write-review-prompt" id="review-prompt-btn">
          <p>✍️ Share your thoughts — <strong>Write a Review</strong></p>
        </div>
        <div class="review-form" id="review-form-box">
          <p style="font-family:'Cinzel',serif;font-size:14px;font-weight:600;margin-bottom:12px;">Your Rating</p>
          <div class="star-input" id="star-input-row">
            ${Array.from({length:10},(_,i) => `<button class="star-input-btn" data-val="${i+1}" type="button">★</button>`).join('')}
          </div>
          <textarea class="review-textarea" id="review-text-input" placeholder="Write your review here..."></textarea>
          <div class="review-submit-row">
            <button class="btn-cancel" id="review-cancel-btn" type="button">Cancel</button>
            <button class="btn-submit" id="review-submit-btn" type="button">Submit Review</button>
          </div>
        </div>
      `;
      bindWriteEvents();
    } else {
      wrap.innerHTML = `
        <div class="write-review-prompt" id="review-login-prompt">
          <p>🔐 <strong>Login</strong> to write a review and share your opinion</p>
        </div>
      `;
      document.getElementById('review-login-prompt').addEventListener('click', () => {
        AuthModal.show('login');
      });
    }
  }
  function bindWriteEvents() {
    const prompt = document.getElementById('review-prompt-btn');
    const form = document.getElementById('review-form-box');
    const cancelBtn = document.getElementById('review-cancel-btn');
    const submitBtn = document.getElementById('review-submit-btn');
    const starRow = document.getElementById('star-input-row');
    prompt.addEventListener('click', () => {
      form.classList.add('visible');
      prompt.style.display = 'none';
    });
    cancelBtn.addEventListener('click', () => {
      form.classList.remove('visible');
      prompt.style.display = 'block';
      selectedRating = 0;
      updateStarDisplay();
    });
    // Star input
    starRow.addEventListener('mouseover', e => {
      const btn = e.target.closest('.star-input-btn');
      if (!btn) return;
      const v = +btn.dataset.val;
      starRow.querySelectorAll('.star-input-btn').forEach((b, i) => {
        b.classList.toggle('hover', i < v);
      });
    });
    starRow.addEventListener('mouseleave', () => {
      starRow.querySelectorAll('.star-input-btn').forEach((b, i) => {
        b.classList.remove('hover');
        b.classList.toggle('selected', i < selectedRating);
      });
    });
    starRow.addEventListener('click', e => {
      const btn = e.target.closest('.star-input-btn');
      if (!btn) return;
      selectedRating = +btn.dataset.val;
      updateStarDisplay();
      btn.style.animation = 'none';
      void btn.offsetWidth;
      btn.style.animation = 'starPop 0.25s ease';
    });
    submitBtn.addEventListener('click', handleSubmit);
  }
  function updateStarDisplay() {
    const starRow = document.getElementById('star-input-row');
    if (!starRow) return;
    starRow.querySelectorAll('.star-input-btn').forEach((b, i) => {
      b.classList.toggle('selected', i < selectedRating);
    });
  }
  function handleSubmit() {
    const user = RFC_AUTH.getUser();
    if (!user) { AuthModal.show('login'); return; }
    const text = document.getElementById('review-text-input').value.trim();
    if (!selectedRating) { RFC_UI.showToast('Please select a rating ⭐', 'error'); return; }
    if (!text) { RFC_UI.showToast('Please write a review first ✍️', 'error'); return; }
    const review = {
      id: 'ur_' + Date.now(),
      user: user.username,
      avatar: user.avatar,
      rating: selectedRating,
      text,
      date: new Date().toISOString().split('T')[0]
    };
    addReview(currentMovieId, review);
    RFC_UI.showToast('Review posted! Thanks for sharing 🎬', 'success');
    renderWriteSection();
    renderReviews();
  }
  function renderReviews() {
    const container = document.getElementById('reviews-list');
    if (!container) return;
    const reviews = getReviews(currentMovieId);
    if (!reviews.length) {
      container.innerHTML = `<div class="empty-state"><div class="icon">🎬</div><h3>No Reviews Yet</h3><p>Be the first to review this title.</p></div>`;
      return;
    }
    container.innerHTML = reviews.map((r, idx) => `
      <div class="review-card" style="animation-delay:${idx * 0.07}s">
        <div class="review-header">
          <div class="review-avatar">${r.avatar || r.user[0].toUpperCase()}</div>
          <div>
            <div class="review-user">${r.user}</div>
            <div class="review-date">${formatDate(r.date)}</div>
          </div>
          <div class="review-stars">${renderStars(r.rating, 13)}</div>
        </div>
        <p class="review-text">${escapeHtml(r.text)}</p>
      </div>
    `).join('');
  }
  function formatDate(d) {
    return new Date(d).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
  }
  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  return { init, renderStars };
})();
