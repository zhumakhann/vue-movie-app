<template>
  <div class="search-wrapper">
    <form action="" class="search">
      <input
        type="search"
        class="search-input"
        placeholder="Фильмы, сериалы, актеры"
        @input="onInputHandler"
      />
      <button type="submit" class="search-button">
        <img src="../../assets/search-icon.svg" alt="search-icon" />
      </button>
    </form>
    <ul class="search-list">
      <li class="search-list__item" v-for="film in getSearchFilms" :key="film.id">
        <!-- <router-link> {{film.title}} </router-link> -->
        <a @click.prevent="onClickHandler(film.id)"> {{film.title}} </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import router from '../../router'


export default {
  name: "Search",
  methods: {
    ...mapActions(['searchFilm', 'resetSearchFilm']),
    onInputHandler(e) {
      // console.log(e.target.value);
      console.log(e.target.value);
      this.searchFilm(e.target.value);
    },
    async onClickHandler(id){
      console.log(id);
      console.log(router);
      // router.go(-1)
      await router.push({ path: `/film/${id}` })
      this.resetSearchFilm() 
    }
  },
  computed: mapGetters(['getSearchFilms'])
};
</script>
<style>
.search-wrapper {
  position: relative;
  flex-grow: 1;
  margin: 0 50px;
}
.search-list {
  position: absolute;
  left: 0;
  right: 56px;
  top: calc(100%);
  background-color: #fff;
  padding: 0 20px;
  list-style: none;
  max-height: 300px;
  overflow-y: scroll;
}
.search-list__item {
  color: #000;
  margin-bottom: 10px;
  border-bottom: 1px solid #000;
}
.search-list__item a{
  display: block;
  padding: 10px 0;
  font-size: 20px;
}
</style>