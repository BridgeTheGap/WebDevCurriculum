<template>
  <div id="root"></div>
</template>

<script>
import store from './store.js';

export default {
  name: 'app',
  data() {
    return store;
  },
  components: {},
  created() {
    this.initializeAction();
  }
};
</script>

<style>
#root {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
