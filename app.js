/* ============================================================
   Rohan's Final Cut — Editorial Platform (3-Column Layout & Infinite Scroll)
   ============================================================ */
const RFC_App = {
  container: document.getElementById('app'),
  heroInterval: null,
  hoverTimers: {},
  myList: JSON.parse(localStorage.getItem('rfc_mylist') || '[]'),
  reviews: JSON.parse(localStorage.getItem('rfc_reviews') || '[]'),
  
  // Pagination State
  currentPage: 1,
  currentEndpoint: null, // Stores the function reference for infinite scroll
  currentParams: {}, // Stores current endpoint args
  isLoading: false,
  hasMore: true,
  observer: null,
  
  async init() {
    setTimeout(() => {
      const loader = document.getElementById('loading-screen');
      if (loader) loader.classList.add('out');
    }, 800);
    this.setupListeners();
    this.renderCommunityTicker();
    this.handleRoute();
  },
  setupListeners() {
    window.addEventListener('hashchange', () => this.handleRoute());
    
    const searchInput = document.getElementById('nav-search-input');
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const q = searchInput.value.trim();
          if (q) window.location.hash = `#search/${encodeURIComponent(q)}`;
        }
      });
    }
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      if (window.scrollY > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
    // Native CSS 3D Tilt delegation
    document.addEventListener('mousemove', (e) => {
      const card = e.target.closest('.m-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rx = -((y - cy) / cy) * 10; // Max 10deg rotation
        const ry = ((x - cx) / cx) * 10;
        card.style.setProperty('--rx', `${rx}deg`);
        card.style.setProperty('--ry', `${ry}deg`);
      }
    });
    document.addEventListener('mouseout', (e) => {
      const card = e.target.closest('.m-card');
      if (card) {
        card.style.setProperty('--rx', `0deg`);
        card.style.setProperty('--ry', `0deg`);
      }
    });
  },
  setupInfiniteScroll(endpointFunc, ...params) {
    this.currentPage = 1;
    this.currentEndpoint = endpointFunc;
    this.currentParams = params;
    this.hasMore = true;
    // Inject loader
    let loader = document.getElementById('infinite-loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.id = 'infinite-loader';
      loader.className = 'infinite-loader';
      loader.innerText = 'Loading More...';
      this.container.appendChild(loader);
    }
    loader.classList.add('active');
    if (this.observer) this.observer.disconnect();
    this.observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting && !this.isLoading && this.hasMore) {
        await this.loadMoreContent();
      }
    }, { rootMargin: '400px' }); // Trigger 400px before bottom
    this.observer.observe(loader);
  },
  async loadMoreContent() {
    this.isLoading = true;
    this.currentPage++;
    try {
      const data = await this.currentEndpoint(...this.currentParams, this.currentPage);
      if (data && data.results && data.results.length > 0) {
        const grid = document.querySelector('.mlt-grid');
        if (grid) {
          // Re-evaluate what type default should be based on endpoint
          let defaultType = 'movie';
          if (this.currentEndpoint === TMDB.getTopSeriesCharts) defaultType = 'tv';
          
          grid.innerHTML += data.results.map(item => this.buildCard(item, item.media_type || defaultType)).join('');
        }
      } else {
        this.hasMore = false;
        document.getElementById('infinite-loader')?.classList.remove('active');
      }
    } catch (e) {
      console.error('Pagination error:', e);
      this.hasMore = false;
    }
    this.isLoading = false;
  },
  updateNavActive(tab) {
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    const activeEl = document.querySelector(`.nav-link[data-nav="${tab}"]`);
    if (activeEl) activeEl.classList.add('active');
  },
  loadRoute(hash) {
    window.location.hash = hash;
  },
  async handleRoute() {
    const hash = window.location.hash.slice(1);
    
    if (this.heroInterval) clearInterval(this.heroInterval);
    if (this.observer) { this.observer.disconnect(); this.currentEndpoint = null; }
    window.scrollTo(0, 0);
    if (!TMDB.apiKey) {
      return this.renderEmptyState('API Key Required', 'Please add your TMDB API Key to js/config.js.');
    }
    if (!hash || hash === '') {
      this.updateNavActive('dashboard');
      await this.renderDashboard();
    } else if (hash.startsWith('detail/')) {
      const parts = hash.split('/');
      await this.renderDetail(parts[1], parts[2]);
    } else if (hash.startsWith('search/')) {
      await this.renderSearch(decodeURIComponent(hash.split('/')[1]));
    } else if (hash === 'movies') {
      this.updateNavActive('movies');
      await this.renderTopMovies();
    } else if (hash === 'tv') {
      this.updateNavActive('tv');
      await this.renderTopSeries();
    } else if (hash === 'critics') {
      this.updateNavActive('critics');
      await this.renderCriticReviews();
    } else if (hash === 'community') {
      this.updateNavActive('community');
      await this.renderCommunityFeed();
    } else if (hash === 'trailers') {
      this.updateNavActive('trailers');
      await this.renderTrailersHub();
    } else if (hash === 'news') {
      this.updateNavActive('news');
      await this.renderNewsMockup();
    } else if (hash === 'genres') {
      this.updateNavActive('genres');
      await this.renderGenres();
    } else if (hash.startsWith('genre/')) {
      const parts = hash.split('/');
      await this.renderGenreCategory(parts[1], decodeURIComponent(parts[2]));
    } else if (hash === 'forums') {
      this.updateNavActive('forums');
      await this.renderForumsMockup();
    } else if (hash === 'notebook') {
      this.updateNavActive('notebook');
      await this.renderNotebook();
    } else if (hash === 'profile') {
      await this.renderProfile();
    } else {
      await this.renderDashboard();
    }
  },
  setLoading() {
    this.container.innerHTML = `
      <div class="page active">
        <div style="height:50vh;display:flex;align-items:center;justify-content:center;">
           <div class="load-title" style="font-size:24px;color:var(--text-muted);">Loading...</div>
        </div>
      </div>
    `;
  },
  renderEmptyState(title, msg) {
    this.container.innerHTML = `
      <div class="page active">
        <div class="page-header" style="text-align:center;">
          <h1 class="page-title">${title}</h1>
          <p class="page-desc" style="margin:0 auto;">${msg}</p>
        </div>
      </div>
    `;
  },
  renderCommunityTicker() {
    const feed = document.getElementById('ticker-feed');
    if (!feed) return;
    
    // Mix user reviews with some simulated active data for the right sidebar
    let localData = this.reviews.map(r => ({
      user: 'You', rating: r.rating, title: r.title, text: r.text, time: 'Just now'
    }));
    
    const mockData = [
      { user: 'Cinephile99', rating: 9, title: 'Dune: Part Two', text: 'An absolute visual masterpiece.', time: '5m ago' },
      { user: 'FilmBro23', rating: 7, title: 'Oppenheimer', text: 'Great acting, but the pacing felt a bit slow in the middle.', time: '12m ago' },
      { user: 'SarahReviews', rating: 10, title: 'Past Lives', text: 'Heartbreakingly beautiful. I could not stop crying.', time: '1h ago' },
      { user: 'ActionJunkie', rating: 8, title: 'Godzilla Minus One', text: 'The scale and emotion of this movie are unmatched!', time: '2h ago' }
    ];
    const displayData = [...localData, ...mockData].slice(0, 10);
    
    feed.innerHTML = displayData.map(item => `
      <div class="ticker-item">
        <div class="ticker-meta">
          <div class="ticker-user">
            <div style="width:16px;height:16px;border-radius:50%;background:var(--accent-blue);"></div>
            ${item.user}
          </div>
          <div class="ticker-rating">★ ${item.rating}</div>
        </div>
        <div class="ticker-movie" onclick="RFC_App.loadRoute('#search/${encodeURIComponent(item.title)}')">${item.title}</div>
        <div class="ticker-text">"${item.text}"</div>
        <div style="font-size:10px;color:var(--text-muted);margin-top:4px;">${item.time}</div>
      </div>
    `).join('');
  },
  applyFilters() {
    // Simulated filter application for the left sidebar
    const genre = document.getElementById('filter-genre').value;
    if (genre) this.loadRoute(`#genre/${genre}/Filtered`);
    else this.loadRoute('#movies');
  },
  async renderDashboard() {
    this.setLoading();
    try {
      const trending = await TMDB.getDashboardTrending();
      if (!trending || !trending.results) return this.renderEmptyState('Connection Failed', 'Could not fetch data from TMDB.');
      let html = `<div class="page active">`;
      html += await this.buildCinematicHero(trending.results[0]); 
      
      html += `<div style="position:relative; z-index:10;">`;
      html += this.buildRow('Trending Highlights', trending.results.slice(1, 15));
      html += `</div></div>`;
      this.container.innerHTML = html;
    } catch (e) {
      console.error(e);
      this.renderEmptyState('Error', 'An error occurred while loading the dashboard.');
    }
  },
  async buildCinematicHero(item) {
    if (!item) return '';
    const title = item.title || item.name;
    const desc = item.overview || '';
    const type = item.media_type || 'movie';
    const backdrop = TMDB.getBackdrop(item.backdrop_path);
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'NR';
    
    const ytId = await TMDB.getTrailerId(item.id, type);
    
    // Iframe fix implementation (Error 153 configuration parameters)
    let videoHtml = '';
    if (ytId) {
      videoHtml = `
        <div class="hero-video-wrapper">
          <iframe 
            src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&rel=0&modestbranding=1&enablejsapi=1&origin=http://localhost" 
            onload="this.classList.add('loaded'); document.getElementById('hero-fallback-img').classList.add('hidden');"
            allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
      `;
    }
    return `
      <div id="hero">
        <div class="ambient-glow" style="background:radial-gradient(circle at center, var(--accent) 0%, transparent 70%);"></div>
        <img id="hero-fallback-img" src="${backdrop}" class="hero-slide-img" alt="${title}"/>
        ${videoHtml}
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="hero-rating-badge">★ ${rating} TMDB Average</div>
          <h1 class="hero-title">${title}</h1>
          <p class="hero-desc">${desc}</p>
          <div class="hero-btns">
            <button class="btn-hero-primary" onclick="window.location.hash='#detail/${type}/${item.id}'">
              Write a Review
            </button>
            <button class="btn-hero-secondary" onclick="window.location.hash='#detail/${type}/${item.id}'">
              Read Community Reviews
            </button>
          </div>
        </div>
      </div>
    `;
  },
  async renderTopMovies() {
    this.setLoading();
    const data = await TMDB.getTopMovieCharts();
    this.renderGridPage('Global Top Movies', 'Real-time rankings based on TMDB global metrics.', data.results, 'movie');
    this.setupInfiniteScroll(TMDB.getTopMovieCharts.bind(TMDB));
  },
  async renderTopSeries() {
    this.setLoading();
    const data = await TMDB.getTopSeriesCharts();
    this.renderGridPage('Global Top Series', 'The highest-rated television shows worldwide.', data.results, 'tv');
    this.setupInfiniteScroll(TMDB.getTopSeriesCharts.bind(TMDB));
  },
  async renderCriticReviews() {
    this.setLoading();
    const data = await TMDB.getCriticPicks();
    this.renderGridPage('Critic Reviews', 'Curated, highly acclaimed editorial selections.', data.results, 'movie');
    this.setupInfiniteScroll(TMDB.getCriticPicks.bind(TMDB));
  },
  async renderTrailersHub() {
    this.setLoading();
    const data = await TMDB.getUpcomingTrailers();
    this.renderGridPage('Trailers Hub', 'Newly released high-definition trailers for upcoming titles.', data.results, 'movie');
    this.setupInfiniteScroll(TMDB.getUpcomingTrailers.bind(TMDB));
  },
  async renderHallOfFame() {
    this.setLoading();
    const data = await TMDB.getHallOfFame();
    this.renderGridPage('Hall of Fame', 'Curated historical masterpieces released before 2000.', data.results, 'movie');
    this.setupInfiniteScroll(TMDB.getHallOfFame.bind(TMDB));
  },
  async renderGenres() {
    this.setLoading();
    const data = await TMDB.getGenres('movie');
    if (!data || !data.genres) return this.renderEmptyState('Error', 'Failed to load genres.');
    
    let html = `<div class="page active">
      <div class="page-header"><h1 class="page-title">Genre Guide</h1><p class="page-desc">Deep tag-based exploration interface.</p></div>
      <div style="display:flex; flex-wrap:wrap; gap:12px; padding-bottom:60px;">
        ${data.genres.map(g => `
          <div style="padding:16px 24px; background:var(--bg-card); border:1px solid var(--glass-border); border-radius:var(--radius); font-weight:700; cursor:pointer; color:var(--text-light); transition:var(--trans); backdrop-filter:blur(10px);"
               onmouseenter="this.style.borderColor='var(--accent-blue)'; this.style.transform='translateY(-2px)';"
               onmouseleave="this.style.borderColor='var(--glass-border)'; this.style.transform='none';"
               onclick="window.location.hash='#genre/${g.id}/${encodeURIComponent(g.name)}'">
            ${g.name}
          </div>
        `).join('')}
      </div>
    </div>`;
    this.container.innerHTML = html;
  },
  async renderGenreCategory(id, name) {
    this.setLoading();
    const data = await TMDB.getMoviesByGenre(id);
    this.renderGridPage(`${name} Movies`, `Exploring titles tagged under ${name}.`, data.results, 'movie');
    this.setupInfiniteScroll(TMDB.getMoviesByGenre.bind(TMDB), id);
  },
  async renderNewsMockup() {
    let html = `<div class="page active">
      <div class="page-header"><h1 class="page-title">News & Articles</h1><p class="page-desc">Industry breaking text logs and editorial columns.</p></div>
      <div style="display:flex; flex-direction:column; gap:20px; padding-bottom:60px;">
        <div class="glass-panel" style="padding:30px; border-radius:var(--radius-lg); cursor:pointer;">
          <div style="color:var(--accent); font-size:12px; font-weight:700; letter-spacing:1px; margin-bottom:10px;">BREAKING</div>
          <h2 style="color:var(--text-light); font-family:'Playfair Display',serif; margin-bottom:12px;">Christopher Nolan Announces Next Sci-Fi Epic</h2>
          <p style="color:var(--text);">The acclaimed director reveals that his next project will take place entirely in a newly discovered galaxy, shooting completely in IMAX...</p>
        </div>
        <div class="glass-panel" style="padding:30px; border-radius:var(--radius-lg); cursor:pointer;">
          <div style="color:var(--accent-blue); font-size:12px; font-weight:700; letter-spacing:1px; margin-bottom:10px;">EDITORIAL</div>
          <h2 style="color:var(--text-light); font-family:'Playfair Display',serif; margin-bottom:12px;">Why 1999 Was the Greatest Year in Cinema History</h2>
          <p style="color:var(--text);">From The Matrix to Fight Club, we explore the cultural phenomenons that birthed a new generation of filmmaking...</p>
        </div>
      </div>
    </div>`;
    this.container.innerHTML = html;
  },
  async renderForumsMockup() {
    let html = `<div class="page active">
      <div class="page-header"><h1 class="page-title">Community Forums</h1><p class="page-desc">Topic discussion rooms.</p></div>
      <div style="display:flex; flex-direction:column; gap:16px; padding-bottom:60px;">
        <div class="glass-panel" style="padding:20px; border-radius:var(--radius); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h3 style="color:var(--text-light); margin-bottom:4px;">Official Discussion: Dune Part Two Spoilers</h3>
            <div style="font-size:12px; color:var(--text-muted);">Started by Cinephile99 • 1,240 replies</div>
          </div>
          <div style="background:var(--bg); padding:6px 12px; border-radius:var(--radius); font-size:12px;">HOT</div>
        </div>
        <div class="glass-panel" style="padding:20px; border-radius:var(--radius); display:flex; justify-content:space-between; align-items:center;">
          <div>
            <h3 style="color:var(--text-light); margin-bottom:4px;">Recommend me a good psychological thriller?</h3>
            <div style="font-size:12px; color:var(--text-muted);">Started by GuestUser • 45 replies</div>
          </div>
        </div>
      </div>
    </div>`;
    this.container.innerHTML = html;
  },
  renderGridPage(title, desc, items, defaultType = 'movie') {
    if (!items || !items.length) {
      return this.renderEmptyState(title, 'No items found.');
    }
    let html = `<div class="page active">
      <div class="page-header"><h1 class="page-title">${title}</h1><p class="page-desc">${desc}</p></div>
      <div class="mlt-grid">
        ${items.map(item => this.buildCard(item, item.media_type || defaultType)).join('')}
      </div>
    </div>`;
    this.container.innerHTML = html;
  },
  buildRow(title, items) {
    if (!items || !items.length) return '';
    const cards = items.map(item => this.buildCard(item, item.media_type || (item.name ? 'tv' : 'movie'))).join('');
    return `
      <div class="sec-header">
        <h2 class="sec-title">${title}</h2>
      </div>
      <div class="card-row-wrap">
        <div class="card-row">
          ${cards}
        </div>
      </div>
    `;
  },
  buildCard(item, type = 'movie') {
    const title = item.title || item.name;
    const poster = TMDB.getPoster(item.poster_path);
    const id = item.id;
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'NR';
    // Native CSS Variables are handled via global mousemove listener in setupListeners
    return `
      <div class="m-card" 
           data-id="${id}" data-type="${type}"
           onmouseenter="RFC_App.handleCardEnter(this)" onmouseleave="RFC_App.handleCardLeave(this)"
           onclick="if(!this.dataset.preventClick) window.location.hash='#detail/${type}/${id}'">
        <div class="card-poster">
          ${poster ? `<img src="${poster}" loading="lazy" alt="${title}"/>` : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:24px;color:#333;">RFC</div>`}
        </div>
        <div class="card-overlay">
          <div class="card-rating"><span class="card-rating-icon">★</span> ${rating}</div>
          <div class="card-title">${title}</div>
        </div>
        <div class="card-video-wrapper"></div>
      </div>
    `;
  },
  handleCardEnter(el) {
    const id = el.dataset.id;
    const type = el.dataset.type;
    const wrapper = el.querySelector('.card-video-wrapper');
    
    this.hoverTimers[id] = setTimeout(async () => {
      el.dataset.preventClick = "true";
      const ytId = await TMDB.getTrailerId(id, type);
      if (ytId && this.hoverTimers[id]) { 
        // Applying the iframe fix (Error 153) here as well
        wrapper.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&rel=0&modestbranding=1&enablejsapi=1&origin=http://localhost" 
                  allow="autoplay; encrypted-media" allowfullscreen></iframe>
        `;
        wrapper.classList.add('active');
      }
      setTimeout(() => el.dataset.preventClick = "", 100);
    }, 1000);
  },
  handleCardLeave(el) {
    const id = el.dataset.id;
    clearTimeout(this.hoverTimers[id]);
    delete this.hoverTimers[id];
    
    const wrapper = el.querySelector('.card-video-wrapper');
    wrapper.classList.remove('active');
    setTimeout(() => { if(!wrapper.classList.contains('active')) wrapper.innerHTML = ''; }, 400);
  },
  async renderDetail(type, id) {
    this.setLoading();
    try {
      const data = await TMDB.getDetails(id, type);
      if (!data) return this.renderEmptyState('Not Found', 'Could not fetch details.');
      const title = data.title || data.name;
      const releaseDate = data.release_date || data.first_air_date || '';
      const year = releaseDate ? releaseDate.split('-')[0] : 'N/A';
      
      const rating = data.vote_average ? data.vote_average.toFixed(1) : 'NR';
      const backdrop = TMDB.getBackdrop(data.backdrop_path);
      const poster = TMDB.getPoster(data.poster_path);
      
      const director = data.credits?.crew?.find(c => c.job === 'Director')?.name || 'N/A';
      const inList = this.myList.find(i => i.id == id);
      const localReviews = this.reviews.filter(r => r.media_id == id);
      
      let html = `<div class="page active">`;
      html += `
        <div class="detail-hero">
          ${backdrop ? `<img src="${backdrop}" class="detail-hero-bg" alt="Backdrop"/>` : ''}
          <div class="detail-hero-overlay"></div>
          <div class="detail-content">
            
            <div class="detail-poster">
              ${poster ? `<img src="${poster}" alt="${title}"/>` : ''}
            </div>
            <div class="detail-main">
              <h1 class="detail-title">${title}</h1>
              <div class="detail-meta-row">
                <span>${year}</span>
                <span>Directed by ${director}</span>
                <span style="color:var(--accent);">★ ${rating} TMDB</span>
              </div>
              
              <p class="detail-desc">${data.overview || 'No description available.'}</p>
              
              <div class="detail-actions">
                <button class="btn-editorial secondary" onclick="RFC_App.toggleMyList(${id}, '${type}', '${title.replace(/'/g, "\\'")}', '${data.poster_path}')">
                  ${inList ? '✓ Saved to Notebook' : '＋ Add to Notebook'}
                </button>
                <button class="btn-editorial primary" onclick="document.getElementById('review-form').scrollIntoView({behavior:'smooth'})">
                  Write Review
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      html += `
        <div class="review-section" id="review-form">
          <div class="sec-header"><h2 class="sec-title" style="color:var(--text-light); font-size:24px; font-family:'Playfair Display',serif; text-transform:none;">Reviews & Critique</h2></div>
          
          <div class="review-form glass-panel">
            <div class="rating-slider-container">
              <div class="rating-label">
                <span>Your Rating</span>
                <span id="rating-val-display" style="color:var(--accent); font-weight:700;">5/10</span>
              </div>
              <input type="range" min="1" max="10" value="5" class="rating-slider" id="rating-input" 
                     oninput="document.getElementById('rating-val-display').innerText = this.value + '/10'" />
            </div>
            
            <textarea id="review-text-input" class="review-textarea" placeholder="Add a review..."></textarea>
            
            <div style="display:flex; justify-content:flex-end;">
              <button class="btn-editorial primary" onclick="RFC_App.submitReview(${id}, '${type}', '${title.replace(/'/g, "\\'")}')">
                Submit Review
              </button>
            </div>
          </div>
          <h3 class="sec-title" style="margin-bottom:24px;">Community Reviews</h3>
          <div class="reviews-masonry">
      `;
      if (localReviews.length === 0) {
        html += `<div style="color:var(--text-muted); font-style:italic;">No community reviews yet. Be the first!</div>`;
      } else {
        const sortedReviews = [...localReviews].reverse();
        sortedReviews.forEach(rev => {
          html += `
            <div class="review-card glass-panel" style="transform: perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));"
                 onmousemove="
                   const r = this.getBoundingClientRect(); 
                   const x = event.clientX - r.left; const y = event.clientY - r.top;
                   this.style.setProperty('--rx', -((y - r.height/2)/r.height*10)+'deg');
                   this.style.setProperty('--ry', ((x - r.width/2)/r.width*10)+'deg');
                 " onmouseleave="this.style.setProperty('--rx','0deg'); this.style.setProperty('--ry','0deg');">
              <div class="review-card-header">
                <div class="reviewer-avatar">R</div>
                <div class="reviewer-info">
                  <div class="reviewer-name">Rohan Community User</div>
                  <div class="reviewer-date">${new Date(rev.timestamp).toLocaleDateString()}</div>
                </div>
                <div class="review-card-rating">★ ${rev.rating}/10</div>
              </div>
              <p class="review-card-text">"${rev.text}"</p>
            </div>
          `;
        });
      }
      html += `</div></div></div>`;
      this.container.innerHTML = html;
    } catch (e) {
      console.error(e);
      this.renderEmptyState('Error', 'Failed to load details.');
    }
  },
  submitReview(id, type, title) {
    const rating = document.getElementById('rating-input').value;
    const text = document.getElementById('review-text-input').value.trim();
    
    if (!text) return this.showToast('Review text cannot be empty.', 'error');
    this.reviews.push({ media_id: id, media_type: type, title, rating: parseInt(rating), text, timestamp: Date.now() });
    localStorage.setItem('rfc_reviews', JSON.stringify(this.reviews));
    
    this.showToast('Review submitted successfully!');
    this.renderCommunityTicker(); // Update right sidebar live
    this.renderDetail(type, id);
  },
  async renderSearch(query) {
    this.setLoading();
    try {
      const data = await TMDB.search(query);
      let html = `<div class="page active"><div class="page-header"><h1 class="page-title">Search</h1><p class="page-desc">Results for "${query}"</p></div>`;
      
      if (data && data.results && data.results.length > 0) {
        const results = data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');
        html += `<div class="mlt-grid">${results.map(item => this.buildCard(item, item.media_type)).join('')}</div>`;
      } else {
        html += `<div style="color:var(--text-muted);">No results found.</div>`;
      }
      
      html += `</div>`;
      this.container.innerHTML = html;
    } catch (e) {
      this.renderEmptyState('Search Failed', 'Could not complete the search.');
    }
  },
  async renderNotebook() {
    let html = `<div class="page active">
      <div class="page-header"><h1 class="page-title">My Notebook</h1><p class="page-desc">Your personal watchlist.</p></div>`;
    if (this.myList.length === 0) {
      html += `<div class="glass-panel" style="text-align:center; padding:60px; border-radius:var(--radius-lg);">
        <div style="font-size:48px; margin-bottom:16px; opacity:0.5;">📓</div>
        <h3 style="color:var(--text-light); margin-bottom:8px;">Your Notebook is empty.</h3>
        <p>Save movies and shows you want to watch or review later.</p>
      </div>`;
    } else {
      html += `<div class="mlt-grid">${this.myList.map(item => this.buildCard(item, item.media_type || 'movie')).join('')}</div>`;
    }
    html += `</div>`;
    this.container.innerHTML = html;
  },
  async renderCommunityFeed() {
    let html = `<div class="page active">
      <div class="page-header"><h1 class="page-title">Global Community Feed</h1><p class="page-desc">The latest critiques.</p></div>`;
    if (this.reviews.length === 0) {
      html += `<div class="glass-panel" style="text-align:center; padding:60px; border-radius:var(--radius-lg);">
        <h3 style="color:var(--text-light); margin-bottom:8px;">No reviews yet!</h3>
      </div>`;
    } else {
      const sorted = [...this.reviews].reverse();
      html += `<div class="reviews-masonry">`;
      sorted.forEach(rev => {
        html += `
          <div class="review-card glass-panel" onclick="window.location.hash='#detail/${rev.media_type}/${rev.media_id}'" style="cursor:pointer; transform: perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));"
               onmousemove="
                   const r = this.getBoundingClientRect(); 
                   const x = event.clientX - r.left; const y = event.clientY - r.top;
                   this.style.setProperty('--rx', -((y - r.height/2)/r.height*10)+'deg');
                   this.style.setProperty('--ry', ((x - r.width/2)/r.width*10)+'deg');
                 " onmouseleave="this.style.setProperty('--rx','0deg'); this.style.setProperty('--ry','0deg');">
            <div class="review-card-header">
              <div class="reviewer-avatar">R</div>
              <div class="reviewer-info">
                <div class="reviewer-name">Rohan Community User</div>
                <div class="reviewer-date">Reviewed ${rev.title} • ${new Date(rev.timestamp).toLocaleDateString()}</div>
              </div>
              <div class="review-card-rating">★ ${rev.rating}/10</div>
            </div>
            <p class="review-card-text">"${rev.text}"</p>
          </div>
        `;
      });
      html += `</div>`;
    }
    html += `</div>`;
    this.container.innerHTML = html;
  },
  async renderProfile() {
    const totalReviews = this.reviews.length;
    let avgRating = 0;
    if (totalReviews > 0) avgRating = (this.reviews.reduce((acc, r) => acc + parseInt(r.rating), 0) / totalReviews).toFixed(1);
    let html = `<div class="page active">
      <div class="page-header"><h1 class="page-title">Profile Dashboard</h1><p class="page-desc">Your cinematic analytics.</p></div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:24px; margin-bottom:40px;">
          <div class="glass-panel" style="padding:30px; border-radius:var(--radius-lg); text-align:center;">
            <div style="font-size:48px; color:var(--text-light); font-weight:700;">${totalReviews}</div>
            <div style="color:var(--text-muted); text-transform:uppercase; font-size:12px; font-weight:700;">Total Reviews</div>
          </div>
          <div class="glass-panel" style="padding:30px; border-radius:var(--radius-lg); text-align:center;">
            <div style="font-size:48px; color:var(--accent); font-weight:700;">★ ${avgRating}</div>
            <div style="color:var(--text-muted); text-transform:uppercase; font-size:12px; font-weight:700;">Average Rating</div>
          </div>
          <div class="glass-panel" style="padding:30px; border-radius:var(--radius-lg); text-align:center;">
            <div style="font-size:48px; color:var(--accent-blue); font-weight:700;">${this.myList.length}</div>
            <div style="color:var(--text-muted); text-transform:uppercase; font-size:12px; font-weight:700;">Watchlist Size</div>
          </div>
        </div>
    </div>`;
    this.container.innerHTML = html;
  },
  toggleMyList(id, type, title, poster_path) {
    const idx = this.myList.findIndex(i => i.id == id);
    if (idx > -1) {
      this.myList.splice(idx, 1);
      this.showToast('Removed from Notebook');
    } else {
      this.myList.push({ id, type, title, poster_path, media_type: type });
      this.showToast('Added to Notebook');
    }
    localStorage.setItem('rfc_mylist', JSON.stringify(this.myList));
    if (window.location.hash.includes(`detail/${type}/${id}`)) this.renderDetail(type, id);
  },
  showToast(msg, type='info') {
    const container = document.getElementById('toasts');
    const toast = document.createElement('div');
    toast.className = 'glass-panel';
    toast.style.padding = '12px 24px';
    toast.style.borderLeft = `4px solid ${type==='error' ? '#e50914' : 'var(--accent)'}`;
    toast.style.color = '#fff';
    toast.style.fontWeight = '700';
    toast.style.borderRadius = 'var(--radius)';
    toast.style.marginBottom = '12px';
    toast.style.transition = 'all 0.3s ease';
    toast.innerText = msg;
    
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};
document.addEventListener('DOMContentLoaded', () => {
  RFC_App.init();
});
