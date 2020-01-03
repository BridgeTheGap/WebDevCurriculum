<template>
  <Directory :class="['desktop']" :content="content" @onDoubleClick="onDoubleClick">
    <Window
      v-for="window in windowList"
      :key="`window_${window.name}`"
      :x="window.frame.x"
      :y="window.frame.y"
      :content="window.fileList"
      :directoryName="window.name"
      @onMouseDown="onMouseDown"
      @onMouseMove="onMouseMove"
      @onMouseUp="onMouseUp"
    />
  </Directory>
</template>

<script>
/* eslint-disable no-console */
import Directory from './Directory';
import Window from './Window';
import { QFile, QDirectory } from '../file.js';
import WindowViewData from '../types/WindowViewData.js';

let prev = null;

export default {
  name: 'Desktop',
  mixins: [Directory],
  components: { Directory, Window },
  data() {
    return { windowList: [] };
  },
  methods: {
    onDoubleClick({ fileName }) {
      const item = this.content.find(item => item.name === fileName);
      if (item instanceof QDirectory) {
        // FIXME: QFile parent 구현 후 uncomment
        // data.file.content = await this.dataManager.loadDirectory()
        /* mock code */
        const index = this.content.indexOf(item);

        const content = [
          new QDirectory(`foo_in_${item.name}`),
          new QFile(`bar_in_${item.name}`),
          new QFile(`baz_in_${item.name}`)
        ];
        /* mock code end */
        const offset = (this.windowList.length + 1) * 80;
        const windowData = new WindowViewData(item);
        windowData.frame.x = offset;
        windowData.frame.y = offset;

        this.content[index].setContent('', content);
        this.windowList.push(windowData);
      } else {
        console.log(`open file ${item}`);
      }
    },
    onMouseDown({ $event }) {
      prev = $event;
    },
    onMouseMove({ directoryName, $event }) {
      if (!prev) return;

      const dx = $event.clientX - prev.clientX;
      const dy = $event.clientY - prev.clientY;

      const item = this.windowList.find(e => e.name === directoryName);
      item.frame.x += dx;
      item.frame.y += dy;

      prev = $event;
      this.$forceUpdate();
    },
    onMouseUp() {
      prev = null;
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