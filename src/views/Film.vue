<template>
  <main class="main" v-if="!getFilmLoadingStatus">
    <h1 class="title animated fadeInRight">{{ getFilm.title }}</h1>
    <a :href="getFilm.homepage">
      <small class="title-en animated fadeInRight">Visit site</small>
    </a>
    <div class="info animated fadeInUp delay-1s">
      <div class="movie-info">
        <span class="tag">Фильм</span>
        <span class="country"
          >{{ getFilm.production_countries[0].name }},
          {{ getFilm.release_date.split("-")[0] }} год</span
        >
        <a
          data-fancybox
          href="https://www.youtube.com/watch?v=Xo8i2ZDMlQg"
          class="play"
          >Смотреть трейлер</a
        >
      </div>
      <a :href="getFilm.homepage" class="more">Подробнее</a>
    </div>
    <div class="content">
      <div class="short-info">
        <img
          :src="'https://image.tmdb.org/t/p/original' + getFilm.poster_path"
          alt=""
          @error="
            $event.target.src =
              'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
          "
          class="poster"
        />
        <button class="button">Буду смотреть</button>
        <h3 class="actors-title">В главных ролях:</h3>
        <ul class="actors-list">
          <li
            class="actors-list-item"
            v-for="actor in getFilmActors.cast"
            :key="actor.id"
          >
            {{ actor.name }}
          </li>
        </ul>
      </div>
      <div class="full-info">
        <nav class="tabs">
          <button
            href="#about"
            id="about"
            class="tabs-item tabs-item-active"
            v-on:click="tabClickHandler"
          >
            Описание
          </button>
          <!-- <a href="#reviews" class="tabs-item">Рецензии</a> -->
          <button
            href="#actors"
            id="actors"
            class="tabs-item"
            v-on:click="tabClickHandler"
          >
            Актеры
          </button>
          <button
            href="#similar"
            id="similar"
            class="tabs-item"
            v-on:click="tabClickHandler"
          >
            Similar
          </button>
          <button href="#" class="tabs-item">
            <img
              src="../assets/bookmark-icon.svg"
              alt="bookmark"
              class="bookmark-added"
            />
          </button>
        </nav>
        <div class="full-content">
          <div class="tabs-content visible" id="about">
            <p class="text">
              {{ getFilm.overview }}
            </p>
            <h4 class="text-title">Watch trailer</h4>
            <iframe
              width="100%"
              height="300px"
              :src="'https://www.youtube.com/embed/' + getFilmTrailer[0].key"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="tabs-content" id="actors">
            <ul class="actors__list">
              <li
                class="actors__list-item"
                v-for="actor in getFilmActors.cast"
                :key="actor.id"
              >
                <img
                  class="actors__list-item__img"
                  :src="
                    'https://image.tmdb.org/t/p/original' + actor.profile_path
                  "
                  alt="actor.name"
                  @error="
                    $event.target.src =
                      'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
                  "
                />
                <div class="actors__list-item__content">
                  <h3 class="actors__list-item__content-title">
                    {{ actor.name }}
                  </h3>
                </div>
              </li>
            </ul>
            <p class="text">Тут скоро появятся Актеры</p>
          </div>
          <div class="tabs-content" id="similar">
            <ul class="films__list" v-if="getSimilarFilms.length">
              <filmItem
                v-for="film in getSimilarFilms"
                v-bind:film="film"
                :key="film.id"
              />
            </ul>
            <h2 v-else>
              There is no similar films
            </h2>
          </div>
          <div class="subscribe">
            <!-- Form -->
            <h3 class="subscribe-title">Подпишитесь на обновления</h3>
            <form action="" class="subscribe-form">
              <input
                type="text"
                class="subscribe-input"
                placeholder="Ваш Email"
              />
              <button class="subscribe-button">
                <img src="../assets/check.svg" alt="check" />
              </button>
            </form>
            <!-- AD -->
            <a href="#" class="banner">
              <img src="../assets/banner.jpg" alt="banner" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Preloader v-else />
</template>

<script>
import Preloader from "../components/Preloader.vue";
import { mapActions, mapGetters } from "vuex";
import filmItem from '@/components/filmItem'

export default {
  name: "Film",
  components: { Preloader, filmItem },
  methods: {
    ...mapActions(["fetchFilm", "resetFilm"]),
    tabClickHandler(e) {
      const tabs = document.querySelectorAll(".tabs-item"),
        tabsContent = document.querySelectorAll(".tabs-content"),
        activeTab = document.querySelector(`.tabs-content#${e.target.id}`);
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("tabs-item-active");
      }
      for (let i = 0; i < tabsContent.length; i++) {
        tabsContent[i].classList.remove("visible");
      }
      activeTab.classList.add("visible");
      e.target.classList.add("tabs-item-active");
    },
  },
  computed: mapGetters([
    "getFilm",
    "getFilmActors",
    "getFilmLoadingStatus",
    "getFilmTrailer",
    "getSimilarFilms"
  ]),
  mounted() {
    this.fetchFilm(this.$route.params.name);
    console.log(this.getFilmTrailer);
  },
  beforeDestroy() {
    this.resetFilm();
  },
};
</script>

<style>
.actors__list {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.actors__list-item {
  position: relative;
  margin: 10px 0;
  flex: 0 0 45%;
}
.actors__list-item:hover .actors__list-item__content {
  opacity: 1;
}
.actors__list-item__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
}
.actors__list-item__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  opacity: 0;
  transition: opacity 0.3s;
  color: #fff;
  padding: 30px;
}
.similar{
  flex: 0 0 45%;
  width: auto;
  color: #fff;
}
</style>