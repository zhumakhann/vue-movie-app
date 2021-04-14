<template>
  <section class="search-page">
    hello from search page
    <ul class="films__list" v-if="!getSearchFilmsLoading">
      <filmItem v-for="film in getSearchFilms" v-bind:film="film" :key="film.id" />
    </ul>
    <Preloader v-else />
  </section>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import filmItem from '../components/filmItem'
import Preloader from '../components/Preloader'
export default {
  name: 'SearchPage',
  methods: {
    ...mapActions(['searchFilm'])
  },
  components: {
    filmItem,
    Preloader
  },
  computed: mapGetters(['getSearchFilms', 'getSearchFilmsLoading']),
  mounted(){
    this.searchFilm(this.$route.params.query)
    console.log(this.$route.params.query);
  }
}
</script>