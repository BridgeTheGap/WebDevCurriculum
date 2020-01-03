<template>
  <div @mousedown.stop.self="onMouseDownBackground">
    <FileIcon
      v-for="file in content"
      :key="file.name"
      :x="origin[file.name].x"
      :y="origin[file.name].y"
      :fileName="file.name"
      :icon="icon(file)"
      :isSelected="selection[file.name]"
      @onMouseDown="onMouseDownItem"
      @onMouseMove="onMouseMoveItem"
      @onMouseUp="onMouseUpItem"
      @onDoubleClick="$emit('onDoubleClick', $event)"
    />
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable no-console */
import FileIcon from './FileIcon';
import { fileIcon, drag } from './directoryMethods.js';

export default {
  name: 'Directory',
  props: {
    content: {
      type: Array,
      required: true
    }
  },
  components: { FileIcon },
  data() {
    return {
      selection: {},
      origin: {},
      focused: null,
      clickLoc: null
    };
  },
  created() {
    this.onSetContent();
    console.log(this);
  },
  watch: {
    content() {
      this.onSetContent();
    }
  },
  methods: {
    ...fileIcon,
    ...drag,
    onMouseDownBackground(e) {
      console.log(`event: ${e.target.classList}`);
      console.log(this);
      console.log(`event: ${Object.getOwnPropertyNames(this.selection)}`);

      for (let key in this.selection) {
        this.selection[key] = false;
      }
      this.$forceUpdate();
    },
    onSetContent() {
      this.content.forEach((file, index) => {
        this.selection[file.name] = false;
        this.origin[file.name] = fileIcon.getRect(index).origin;
      });
    }
  }
};
</script>
<style scoped>
div {
}
</style>