<template>
  <header class="header">
    <div class="logo">КиноПульс</div>
    <form action="" class="search">
      <input
        type="search"
        class="search-input"
        placeholder="Фильмы, сериалы, актеры"
      />
      <button type="submit" class="search-button">
        <img src="../../assets/search-icon.svg" alt="search-icon" />
      </button>
    </form>
    <div class="user">
      <img src="../../assets/bookmark.svg" alt="" class="bookmark" />
      <img src="../../assets/avatar.jpg" alt="" class="avatar" />
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  mounted(){
  }
};
</script>
