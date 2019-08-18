<template>
  <section class="container">
      <Main />
  </section>
</template>

<script>
import Main from '~/components/Main.vue'

export default {
  components: {
    Main
  }
}
</script>

<style lang="scss">
  body {
    overflow: hidden;
  }
  .container {
    position: relative;
    margin: 0 auto;
    min-height: 100vh;
    overflow: hidden;
  }
</style>
