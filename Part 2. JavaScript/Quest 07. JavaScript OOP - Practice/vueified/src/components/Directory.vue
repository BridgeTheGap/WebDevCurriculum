<template>
  <div class="window" @mousedown.stop="onMouseDownBackground">
    <FileIcon
      v-for="item in itemList"
      :key="item.file.name"
      :item="item"
      @onMouseDown="onMouseDownItem"
      @onMouseMove="onMouseMoveItem"
      @onMouseUp="onMouseUpItem"
    />
  </div>
</template>

<script>
/* eslint-disable no-console */
import FileIcon from './FileIcon';
import FileViewData from '../types/FileViewData.js';
import ItemAlignment from '../types/HorizontalItemAlignment.js';

const alignment = new ItemAlignment();

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
      itemList: null,
      focusedItem: null,
      clickLoc: null
    };
  },
  watch: {
    content(newValue) {
      this.itemList = newValue.map(
        (element, i) => new FileViewData(element, alignment.getRect(i, 1000))
      );
    }
  },
  methods: {
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

<style scoped>
.window .title-bar {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: gray;
  color: white;
  font-size: medium;
  font-weight: bold;
  font-family: sans-serif;
  width: 100%;
  height: 30px;
}

.title-bar .name {
  margin-left: 10px;
  margin-right: auto;
}

.title-bar .control {
  display: flex;
  margin-right: 10px;
}
.control-button.control-button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 30px;
  height: 30px;
}
</style>