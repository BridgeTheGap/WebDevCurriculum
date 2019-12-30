<template>
  <Directory :class="['desktop']" :content="content" @onDoubleClick="onDoubleClick">
    <Window v-for="window in windowList" :key="window.name" :viewModel="window" />
  </Directory>
</template>

<script>
/* eslint-disable no-console */
import Directory from './Directory';
import Window from './Window';
import { QFile, QDirectory } from '../file.js';
import WindowViewData from '../types/WindowViewData.js';

export default {
  name: 'Desktop',
  mixins: [Directory],
  components: { Directory, Window },
  data() {
    return { windowList: [] };
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
        ];
        /* mock code end */

        const windowData = new WindowViewData(item.file);

        this.content[index].setContent('', content);
        this.windowList.push(windowData);
      } else {
        console.log(`open file ${item.file}`);
      }
    }
  }
};
</script>

<style scoped>
.desktop {
  background-color: ivory;
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>