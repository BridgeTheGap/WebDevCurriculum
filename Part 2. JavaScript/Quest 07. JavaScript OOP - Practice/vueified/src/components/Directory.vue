<template>
  <div :class="this.classList" @mousedown.stop="onMouseDownBackground">
    <FileIcon
      v-for="(file, i) in content"
      :key="file.name"
      :x="getX(i)"
      :y="getY(i)"
      :fileName="file.name"
      :icon="icon(i)"
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
import { fileIcon } from './directoryMethods.js';

const fold = (obj, val) => {
  obj[val.name] = false;
};

export default {
  name: 'Directory',
  props: {
    classList: Array,
    content: {
      type: Array,
      required: true
    }
  },
  components: { FileIcon },
  data() {
    return {
      selection: this.content.reduce(fold, {}),
      focusedIndex: null,
      clickLoc: null
    };
  },
  methods: {
    ...fileIcon,
    onMouseDownItem({ fileName, $event }) {
      this.content.forEach(item => {
        this.selection[item.name] = item.name === fileName;
      });
      this.clickLoc = new DOMPoint($event.clientX, $event.clientY);
      this.focusedIndex = this.content.findIndex(
        item => item.name === fileName
      );
      this.$forceUpdate();
    },
    onMouseMoveItem({ $event }) {
      if (!this.focusedIndex) return;
      // TODO: Assert this.focusedIndex === sender
      const item = this.content[this.focusedIndex];
      console.log(item);
      item.origin.x += $event.clientX - this.clickLoc.x;
      item.origin.y += $event.clientY - this.clickLoc.y;
      this.clickLoc = new DOMPoint($event.clientX, $event.clientY);
    },
    onMouseUpItem() {
      this.clickLoc = null;
      this.focusedIndex = null;
    },
    onMouseDownBackground() {
      this.content.forEach(item => {
        item.isSelected = false;
      });
    }
  }
};
</script>