<template>
  <div id="root">
    <Desktop v-if="root" :content="root.content" />
  </div>
</template>

<script>
/* eslint-disable no-console */
import store from './store.js';
import Desktop from './components/Desktop';

export default {
  name: 'app',
  data() {
    return store.state;
  },
  components: { Desktop },
  created() {
    store.initializeAction();
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
