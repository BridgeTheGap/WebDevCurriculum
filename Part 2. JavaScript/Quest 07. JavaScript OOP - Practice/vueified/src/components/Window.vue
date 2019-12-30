<template>
  <div class="window">
    <div class="title-bar">
      <div class="name">{{ viewModel.name }}</div>
      <div class="control">
        <i class="material-icons control-button close">close</i>
      </div>
    </div>
    <Directory :content="viewModel.fileList" />
  </div>
</template>

<script>
/* eslint-disable no-console */
import WindowViewData from '../types/WindowViewData.js';
import Directory from './Directory';

export default {
  props: {
    index: {
      type: Number
    },
    viewModel: {
      type: WindowViewData,
      required: true
    }
  },
  components: { Directory }
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

.window {
  position: absolute;
  background-color: white;
  border: 1px solid gray;
  top: 80px;
  left: 80px;
  width: 400px;
  height: 360px;
}
</style>