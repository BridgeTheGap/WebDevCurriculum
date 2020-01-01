<template>
  <div class="window" :style="{ left: `${x}px`, top: `${y}px` }">
    <div
      class="title-bar"
      @mousedown.stop="$emit('onMouseDown', { directoryName, $event })"
      @mousemove.stop="$emit('onMouseMove', { directoryName, $event })"
      @mouseup.stop="$emit('onMouseUp', { directoryName, $event })"
    >
      <div class="name">{{ directoryName }}</div>
      <div class="control">
        <i class="material-icons control-button close">close</i>
      </div>
    </div>
    <Directory :content="content" />
  </div>
</template>

<script>
/* eslint-disable no-console */
import Directory from './Directory';

export default {
  name: 'Window',
  components: { Directory },
  props: {
    x: Number,
    y: Number,
    directoryName: String,
    content: Array
  }
};
</script>

<style scoped>
.window {
  position: absolute;
  background-color: white;
  border: 1px solid gray;
  width: 400px;
  height: 360px;
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