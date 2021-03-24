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
      <a href="" class="more">Подробнее</a>
    </div>
    <div class="content">
      <div class="short-info">
        <img
          :src="'https://image.tmdb.org/t/p/original' + getFilm.poster_path"
          alt=""
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
          <button href="#about" id="about" class="tabs-item tabs-item-active" v-on:click="tabClickHandler">Описание</button>
          <!-- <a href="#reviews" class="tabs-item">Рецензии</a> -->
          <button href="#actors" id="actors" class="tabs-item" v-on:click="tabClickHandler">Актеры</button>
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
            <h4 class="text-title">Разработка</h4>
            <p class="text">
              В октябре 2014 года студия Warner Bros. объявила, что в разработке
              находится сольный фильм о Бэтмене, роль которого вновь исполнит
              Бен Аффлек. В июле 2015 года сообщалось, что Аффлек ведёт
              переговоры со студией по поводу постановки фильма и совместного
              написания сценария с Джеффом Джонсом.
            </p>
            <p class="text">
              После выхода фильма «Бэтмен против Супермена: На заре
              справедливости» руководитель агентства WME Патрик Уайтсел
              подтвердил, что Аффлек написал сценарий для сольного фильма о
              Бэтмене и в настоящий момент его рассматривают студия и DC. В мае
              2016 года Джереми Айронс подтвердил, что он появится в фильме про
              Тёмного Рыцаря.
            </p>
            <p class="text">
              На Comic-Con в Сан-Диего в июле 2016 года было официально
              подтверждено, что Аффлек станет режиссёром картины. В августе 2016
              года на одной из страниц Аффлека в социальных сетях был
              опубликован тестовый материал, в котором был показан персонаж
              Детстроук. 8 сентября 2016 года Джефф Джонс подтвердил, что Джо
              Манганьелло сыграет наёмника Слейда Уилсона, который, возможно,
              станет главным злодеем фильма.
            </p>
          </div>
          <div class="tabs-content" id="actors">
            <ul class="actors__list">
              <li class="actors__list-item" v-for="actor in getFilmActors.cast" :key="actor.id">
                <img class="actors__list-item__img" :src="'https://image.tmdb.org/t/p/original' + actor.profile_path" alt="actor.name">
                <div class="actors__list-item__content">
                  <h3 class="actors__list-item__content-title">
                    {{ actor.name }}
                  </h3>
                </div>
              </li>
            </ul>
            <p class="text">Тут скоро появятся Актеры</p>
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
import Preloader from '../components/Preloader.vue'
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Film",
  components: { Preloader },
  methods: {
    ...mapActions(['fetchFilm']),
    tabClickHandler(e){
      const tabs = document.querySelectorAll('.tabs-item'),
        tabsContent = document.querySelectorAll('.tabs-content'),
        activeTab = document.querySelector(`.tabs-content#${e.target.id}`);
      for(let i = 0; i < tabs.length; i++){
        tabs[i].classList.remove('tabs-item-active');
      }
      for(let i = 0; i < tabsContent.length; i++){
        tabsContent[i].classList.remove('visible') 
      }
      activeTab.classList.add('visible')
      e.target.classList.add('tabs-item-active')
    }
  },
  computed: mapGetters(['getFilm', 'getFilmActors', 'getFilmLoadingStatus']),
  mounted() {
    this.fetchFilm(this.$route.params.name);
  },
};
</script>

<style>
.actors__list{
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.actors__list-item{
  position: relative;
  margin: 10px 0;
  flex: 0 0 45%;

}
.actors__list-item:hover .actors__list-item__content{
  opacity: 1;
}
.actors__list-item__img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: 100%;
  max-height: 100%;
}
.actors__list-item__content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .75);
  opacity: 0;
  transition: opacity .3s;
  color: #fff;
  padding: 30px;
}
</style>