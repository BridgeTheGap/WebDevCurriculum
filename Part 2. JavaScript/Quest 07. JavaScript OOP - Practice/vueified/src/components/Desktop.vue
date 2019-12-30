<template>
  <Directory :content="content" @onDoubleClick="onDoubleClick"></Directory>
</template>

<script>
/* eslint-disable */
import Directory from './Directory';
import { QFile, QDirectory } from '../file.js';

export default {
  name: 'Desktop',
  mixins: [Directory],
  components: { Directory },
  data() {
    return { windowList: null };
  },
  methods: {
    onDoubleClick({ item }) {
      if (item.file instanceof QDirectory) {
        // FIXME: QFile parent 구현 후 uncomment
        // data.file.content = await this.dataManager.loadDirectory()
        /* mock code */

        const index = this.content.indexOf(item.file);

        const content = [
          new QDirectory(`foo_in_${item.file.name}`),
          new QFile(`bar_in_${item.file.name}`),
          new QFile(`baz_in_${item.file.name}`)
        ]; //.map(file => new FileViewData(file));
        /* mock code end */

        this.content[index].setContent(``, content);
        // this.windowList.push()
        // this.scene.desktopPresenter.displayDirectory(item.file, content);
      } else {
        console.log(`open file ${item.file}`);
      }
    }
  }
};
</script>

<style scoped>
.window {
  background-color: ivory;
  width: 100%;
  height: 100%;
  position: absolute;
}

.window .window {
  position: absolute;
  background-color: white;
  border: 1px solid gray;
  width: 400px;
  height: 340px;
}
</style>