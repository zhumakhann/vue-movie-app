<template>
  <header class="header">
    <div class="logo">КиноПульс</div>
    <Search />
    <Select />
    <div class="user">
      <img src="../../assets/bookmark.svg" alt="" class="bookmark" />
      <img src="../../assets/avatar.jpg" alt="" class="avatar" />
    </div>
  </header>
</template>

<script>
import Search from "./Search";
import Select from './Select'
export default {
  name: "Header",
  components: { Search, Select },
  mounted() {},
};
</script>
