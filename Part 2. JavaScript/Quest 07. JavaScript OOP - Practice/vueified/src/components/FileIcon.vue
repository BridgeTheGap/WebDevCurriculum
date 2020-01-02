<template>
  <div
    class="desktop-item"
    :class="{ selected: isSelected }"
    :style="{ left: x, top: y }"
    @mousedown.stop="$emit('onMouseDown', { fileName, $event })"
    @mousemove.stop="$emit('onMouseMove', { fileName, $event })"
    @mouseup.stop="$emit('onMouseUp', { fileName, $event })"
    @dblclick.stop="$emit('onDoubleClick', { fileName, $event })"
  >
    <i class="material-icons icon">{{ icon }}</i>
    <div class="label">{{ file.name }}</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { QFile, QDirectory } from '../file.js';

export default {
  props: {
    // TODO: item의 property를 props로 만들자.
    file: QFile,
    origin: DOMPoint,
    isSelected: Boolean
  },
  computed: {
    x() {
      return `${this.origin.x}px`;
    },
    y() {
      return `${this.origin.y}px`;
    },
    icon() {
      return this.file instanceof QDirectory ? 'folder' : 'note';
    },
    fileName() {
      return this.file.name;
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