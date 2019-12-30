<template></template>

<script>
import WindowViewData from '../types/WindowViewData.js';

export default {
  props: {
    viewModel: {
      type: WindowViewData,
      required: true
    }
  }
};
</script>