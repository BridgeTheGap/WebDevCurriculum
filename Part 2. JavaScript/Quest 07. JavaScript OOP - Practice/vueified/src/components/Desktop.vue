<template>
  <div class="desktop">
    <div v-for="item in itemList" :key="item.file.name">
      <FolderItem :item="item" @onMouseDown="onMouseDownItem" />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import FolderItem from './FolderItem';
import FileViewData from '../types/FileViewData.js';
import ItemAlignment from '../types/HorizontalItemAlignment.js';

const alignment = new ItemAlignment();

export default {
  name: 'Desktop',
  props: {
    content: {
      type: Array,
      required: true
    }
  },
  data() {
    return { itemList: null };
  },
  components: { FolderItem },
  watch: {
    content(newValue) {
      this.itemList = newValue.map(
        (element, i) => new FileViewData(element, alignment.getRect(i, 1000))
      );
    }
  },
  methods: {
    onMouseDownItem(sender) {
      this.itemList.forEach(item => (item.isSelected = item === sender));
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

.desktop .window {
  position: absolute;
  background-color: white;
  border: 1px solid gray;
  width: 400px;
  height: 340px;
}

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