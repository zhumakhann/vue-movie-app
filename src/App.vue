<template>
  <div id="app">
    <div class="container">
      <Header />
      <router-view :key="this.$route.params.name" />
    </div>
  </div>
</template>

<script>
import "./normalize.css";
import "./style.css";
import Header from "./components/header/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style>
#app {
  position: relative;
  min-height: 100vh;
}
</style>
