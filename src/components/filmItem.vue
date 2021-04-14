<template>
  <li class="film__list-item">
    <img 
      class="film__list-item__img" 
      :src="'https://image.tmdb.org/t/p/original' + film.poster_path" 
      :alt="film.title"
      @error="$event.target.src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'"

    >
    <div class="film__list-item__content">
      <h3 class="film__list-item__content-title">
        {{ film.title }}
      </h3>
      <button class="film__list-item__content-button" v-on:click="onClickHandler">
        Посмотреть
      </button>
    </div>
  </li>
</template>

<script>
import router from '../router'
export default {  
  name: 'filmItem',
  props: ['film'],
  methods: {
    onClickHandler(){
      console.log('click');
      router.push(`/film/${this.film.id}`)
    }
  },
  mounted(){
  }
}
</script>
<style>
  .film__list-item{
    position: relative;
    width: 250px;
    height: 300px;
    margin: 10px;
  }
  .film__list-item:hover .film__list-item__content{
    opacity: 1;
  }
  .film__list-item__img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 100%;
    max-height: 100%;
  }
  .film__list-item__content{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    background-color: rgba(0, 0, 0, .75);
    display: flex;
    padding: 30px;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    transition: opacity .3s;
  }
  .film__list-item__content-button{
    background: transparent;
    border: 2px solid #fff;
    padding: 10px 20px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all .3s;
    font-weight: 500;
  }
  .film__list-item__content-button:hover{
    background-color: #fff;
    color: #000;
  }
</style>