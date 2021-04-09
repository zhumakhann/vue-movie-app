const api = process.env.VUE_APP_TMDB_API;
const baseURL = process.env.VUE_APP_TMDB_BASE_URL;
export default{
  actions: {
    fetchFilm(ctx, id){
      // console.log(ctx, id);
      const urls = [`${baseURL}/movie/${id}?api_key=${api}`, `${baseURL}/movie/${id}/credits?api_key=${api}`]
      console.log(ctx, id);
      Promise.all(urls.map(url => fetch(url).then(res => res.json())))
        .then(res => {
          ctx.commit('updateFilm', [res[0], res[1]])
          // ctx.commit('updateFilm', res[1])
        })
    },
    resetFilm(ctx){
      ctx.commit('resetFilm')
    }
  },
  mutations: {
    updateFilm(state, film){
      state.film = film[0];
      state.actors = film[1]
      state.isLoading = false
    },
    resetFilm(state){
      state.film = [];
      state.actors = [];
      state.isLoading = true;
    }
  },
  state: {
    film: [],
    actors: [],
    isLoading: true,
  },
  getters: {
    getFilm(state){
      return state.film
    },
    getFilmActors(state){
      return state.actors
    },
    getFilmLoadingStatus(state){
      return state.isLoading
    }
  },
}