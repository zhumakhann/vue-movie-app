const api = process.env.VUE_APP_TMDB_API;
const baseURL = process.env.VUE_APP_TMDB_BASE_URL;
export default{
  actions: {
    fetchFilm(ctx, id){
      // console.log(ctx, id);
      const urls = [
        `${baseURL}/movie/${id}?api_key=${api}`, 
        `${baseURL}/movie/${id}/credits?api_key=${api}`,  
        `${baseURL}/movie/${id}/videos?api_key=${api}`,
        `${baseURL}/movie/${id}/similar?api_key=${api}`
      ]
      console.log(ctx, id);
      Promise.all(urls.map(url => fetch(url).then(res => res.json())))
        .then(res => {
          const trailer = res[2].results.filter(video => video.type === 'Trailer');
          ctx.commit('updateFilm', [res[0], res[1], trailer, res[3].results.slice(0, 10)])
        })
    },
    resetFilm(ctx){
      ctx.commit('resetFilm')
    }
  },
  mutations: {
    updateFilm(state, film){
      console.log(film);
      state.film = film[0];
      state.actors = film[1];
      state.trailer = film[2];
      state.similarFilms = film[3]
      state.isLoading = false
    },
    resetFilm(state){
      state.film = [];
      state.actors = [];
      state.trailer = [];
      state.similarFilms = [];
      state.isLoading = true;
    }
  },
  state: {
    film: [],
    actors: [],
    trailer: [],
    similarFilms: [],
    isLoading: true,
  },
  getters: {
    getFilm(state){
      return state.film
    },
    getFilmActors(state){
      return state.actors
    },
    getFilmTrailer(state){
      return state.trailer
    },
    getSimilarFilms(state){
      return state.similarFilms
    },
    getFilmLoadingStatus(state){
      return state.isLoading
    }
  },
}