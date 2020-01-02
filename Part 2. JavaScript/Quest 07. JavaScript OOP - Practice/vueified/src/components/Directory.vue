<template>
  <div :class="this.classList" @mousedown.stop="onMouseDownBackground">
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
    classList: Array,
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
  watch: {
    content() {
      this.content.forEach((file, index) => {
        this.selection[file.name] = false;
        this.origin[file.name] = fileIcon.getRect(index).origin;
      });
    }
  },
  methods: {
    ...fileIcon,
    ...drag,
    onMouseDownBackground() {
      for (let key in this.selection) {
        this.selection[key] = false;
      }
      this.$forceUpdate();
    }
  }
};
</script>