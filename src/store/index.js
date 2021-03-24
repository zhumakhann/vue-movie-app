import Vue from 'vue';
import Vuex from 'vuex';
import films from './modules/films'
import film from './modules/film'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    films,
    film
  }
})