<template>
  <div
    class="desktop-item"
    :class="{ selected: item.isSelected }"
    :style="{ left: x, top: y }"
    @mousedown.stop="$emit('onMouseDown', { item, $event })"
    @mousemove.stop="$emit('onMouseMove', { item, $event })"
    @mouseup.stop="$emit('onMouseUp', { item, $event })"
  >
    <i class="material-icons icon">{{ item.icon }}</i>
    <div class="label">{{ item.file.name }}</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import FileViewData from '../types/FileViewData.js';

export default {
  props: {
    // TODO: item의 property를 props로 만들자.
    item: {
      type: FileViewData,
      required: true
    }
  },
  computed: {
    origin() {
      return this.item.location.origin;
    },
    x() {
      return `${this.origin.x}px`;
    },
    y() {
      return `${this.origin.y}px`;
    }
  }
};
</script>

<style scoped>
.desktop-item {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  height: 80px;
  cursor: pointer;
  box-sizing: border-box;
}

.desktop-item .icon {
  display: flex;
  font-size: 48px;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  color: salmon;
  margin: 0px;
}

.desktop-item.selected {
  border: 2px solid blue;
  background-color: rgba(0, 0, 255, 0.1);
}

.desktop-item.selected .icon {
  margin-top: -2px;
}

.label {
  font-size: 12px;
  font-family: sans-serif;
}

.desktop-item.selected .label {
  margin-bottom: -2px;
}
</style>