<template>
  <div id="app">
    <div class="container">
      <Header />
      <router-view/>
    </div>
  </div>
</template>

<script>
import './normalize.css'
import './style.css'
import Header from './components/header/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>

</style>
