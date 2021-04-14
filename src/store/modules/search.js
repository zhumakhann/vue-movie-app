const api = process.env.VUE_APP_TMDB_API;
const baseURL = process.env.VUE_APP_TMDB_BASE_URL;

export default{
  actions: {
    async searchFilm(ctx, query = ''){
      console.log('abc');
      console.log(ctx, query);
      const res = await fetch(`${baseURL}/search/movie?api_key=${api}&query=${encodeURI(query)}`)
        .then(res => res.json())
        .then(data => data.results)
      ctx.commit('updateFilmsNames', res)
    },
    resetSearchFilm(ctx){
      ctx.commit('resetSearchFilm')
    }
  },
  mutations: {
    updateFilmsNames(state, newFilms){
      state.searchFilms = newFilms;
      state.isSearchFilmsLoading = false
    },
    resetSearchFilm(state){
      state.searchFilms = []
    }
  },
  state: {
    searchFilms: [],
    isSearchFilmsLoading: true,
  },
  getters: {
    getSearchFilms(state){
      return state.searchFilms
    },
    getSearchFilmsLoading(state){
      return state.isSearchFilmsLoading
    }
  }
}