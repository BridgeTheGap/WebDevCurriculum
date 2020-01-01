<template>
  <div :class="this.classList" @mousedown.stop="onMouseDownBackground">
    <FileIcon
      v-for="(file, i) in content"
      :key="file.name"
      :file="file"
      :origin="origin(i)"
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
import ItemAlignment from '../types/HorizontalItemAlignment.js';

const alignment = new ItemAlignment();

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
      itemList: null,
      focusedItem: null,
      clickLoc: null
    };
  },
  methods: {
    origin(i) {
      const rect = alignment.getRect(i, 1000);
      return new DOMPoint(rect.origin.x, rect.origin.y);
    },
    onMouseDownItem({ item: sender, $event }) {
      this.itemList.forEach(item => {
        item.isSelected = item === sender;
      });
      this.clickLoc = new DOMPoint($event.clientX, $event.clientY);
      this.focusedItem = sender;
    },
    onMouseMoveItem({ $event }) {
      if (!this.focusedItem) return;
      // TODO: Assert this.focusedItem === sender
      this.focusedItem.location.origin.x += $event.clientX - this.clickLoc.x;
      this.focusedItem.location.origin.y += $event.clientY - this.clickLoc.y;
      this.clickLoc = new DOMPoint($event.clientX, $event.clientY);
    },
    onMouseUpItem() {
      this.clickLoc = null;
      this.focusedItem = null;
    },
    onMouseDownBackground() {
      this.itemList.forEach(item => {
        item.isSelected = false;
      });
    }
  }
};
</script>