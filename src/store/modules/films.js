export default{
  actions: {
    fetchFilms(ctx, type = 'popular'){
      const api = process.env.VUE_APP_TMDB_API;
      const baseURL = process.env.VUE_APP_TMDB_BASE_URL;
      console.log(type);
      fetch(`${baseURL}/movie/${type}?api_key=${api}`)
        .then(res => res.json())
        .then(films => ctx.commit('updateFilms', films.results))
        // .then(films => console.log(films))
      // console.log(ctx, type)

    }
  },
  mutations: {
    updateFilms(state, films){
      state.films = films;
      state.isLoading = false;
    }
  },
  state: {
    films: [],
    isLoading: true,

  },
  getters: {
    getFilms(state){
      return state.films
    },
    getLoadingStatus(state){
      return state.isLoading
    }
  },
}