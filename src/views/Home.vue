<template>
  <section class="films">
    <ul class="films__list" v-if="!getLoadingStatus">
      <filmItem v-for="film in getFilms" v-bind:film="film" :key="film.id" />
    </ul>
  </section>
</template>

<script>
// @ is an alias to /src
import filmItem from '@/components/filmItem.vue';
import { mapActions, mapGetters } from 'vuex';


export default {
  name: 'Home',
  components: {
    filmItem
  },
  computed: mapGetters(['getFilms', 'getLoadingStatus']),
  methods: mapActions(['fetchFilms']),
  mounted(){
    this.fetchFilms()
    // console.log(this.getFilms)
  }
}
</script>

<style>
.films__list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
}
</style>
