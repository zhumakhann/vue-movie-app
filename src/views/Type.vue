<template>
  <section class="films">
    <ul class="films__list" v-if="!getLoadingStatus">
      <filmItem v-for="film in getFilms" v-bind:film="film" :key="film.id" />
    </ul>
    <Preloader v-else />
  </section>
</template>

<script>
import filmItem from '@/components/filmItem.vue';
import { mapActions, mapGetters } from 'vuex';
import Preloader from '@/components/Preloader'

export default {
  name: "Type",
  components: { filmItem, Preloader },
  computed: mapGetters(["getFilms", "getLoadingStatus"]),
  methods: mapActions(["fetchFilms"]),
  mounted(){
    this.fetchFilms(this.$route.params.type)
  }
};
</script>

<style>
</style>