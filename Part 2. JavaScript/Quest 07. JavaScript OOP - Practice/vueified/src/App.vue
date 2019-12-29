<template>
  <div id="root">
    <Desktop v-if="root" :content="root.content" @onDoubleClick="onDoubleClick" />
  </div>
</template>

<script>
/* eslint-disable no-console */
import store from './store.js';
import Desktop from './components/Desktop';
import { QFile, QDirectory } from './file.js';

export default {
  name: 'app',
  data() {
    return store.state;
  },
  components: { Desktop },
  methods: {
    onDoubleClick({ item }) {
      if (item.file instanceof QDirectory) {
        // FIXME: QFile parent 구현 후 uncomment
        // data.file.content = await this.dataManager.loadDirectory()
        /* mock code */
        const content = [
          new QDirectory(`foo_in_${item.file.name}`),
          new QFile(`bar_in_${item.file.name}`),
          new QFile(`baz_in_${item.file.name}`)
        ]; //.map(file => new FileViewData(file));
        /* mock code end */
        this.root.setContent(`/${item.file.name}`, content);
        // this.scene.desktopPresenter.displayDirectory(item.file, content);
      } else {
        console.log(`open file ${item.file}`);
      }
    }
  },
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
