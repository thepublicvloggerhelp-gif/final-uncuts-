const TMDB = {
  apiKey: CONFIG.TMDB_API_KEY,
  baseUrl: 'https://api.tmdb.org/3',
  imgBase: 'https://image.tmdb.org/t/p',
  
  init() {
    if (!this.apiKey) {
      console.error('TMDB API Key is missing from config.js');
    }
  },
  
  async fetch(endpoint, params = {}) {
    if (!this.apiKey) return null;
    params.api_key = this.apiKey;
    
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    try {
      const res = await fetch(url.toString(), { headers: { accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error('TMDB Fetch Error:', e);
      return null;
    }
  },
  
  getPoster(path, size = 'w500') {
    return path ? `${this.imgBase}/${size}${path}` : '';
  },
  
  getBackdrop(path, size = 'original') {
    return path ? `${this.imgBase}/${size}${path}` : '';
  },
  
  async getDashboardTrending(page = 1) {
    return this.fetch('/trending/all/day', { page });
  },
  
  async getTopMovieCharts(page = 1) {
    return this.fetch('/movie/top_rated', { page });
  },

  async getTopSeriesCharts(page = 1) {
    return this.fetch('/tv/top_rated', { page });
  },
  
  async getHallOfFame(page = 1) {
    return this.fetch('/discover/movie', {
      sort_by: 'vote_average.desc',
      'vote_count.gte': 5000,
      'primary_release_date.lte': '1999-12-31',
      page
    });
  },

  async getUpcomingTrailers(page = 1) {
    return this.fetch('/movie/upcoming', { page });
  },

  async getCriticPicks(page = 1) {
    return this.fetch('/discover/movie', {
      sort_by: 'popularity.desc',
      with_crew: '1',
      'vote_average.gte': 7.5,
      page
    });
  },

  async getGenres(type = 'movie') {
    return this.fetch(`/genre/${type}/list`);
  },

  async getMoviesByGenre(genreId, page = 1) {
    return this.fetch('/discover/movie', {
      with_genres: genreId,
      sort_by: 'popularity.desc',
      page
    });
  },
  
  async search(query, page = 1) {
    return this.fetch('/search/multi', {
      query: encodeURIComponent(query),
      page,
      include_adult: false
    });
  },
  
  async getDetails(id, type = 'movie') {
    return this.fetch(`/${type}/${id}`, {
      append_to_response: 'videos,credits,similar,reviews'
    });
  },

  async getTrailerId(id, type = 'movie') {
    const data = await this.fetch(`/${type}/${id}/videos`);
    if (data && data.results) {
      const trailer = data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube') || data.results[0];
      return trailer ? trailer.key : null;
    }
    return null;
  }
};

TMDB.init();
