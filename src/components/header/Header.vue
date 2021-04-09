<template>
  <header class="header">
    <div class="logo">КиноПульс</div>
    <Search />
    <div class="user">
      <img src="../../assets/bookmark.svg" alt="" class="bookmark" />
      <img src="../../assets/avatar.jpg" alt="" class="avatar" />
    </div>
  </header>
</template>

<script>
import Search from "./Search";
export default {
  name: "Header",
  components: { Search },
  mounted() {},
};
</script>
