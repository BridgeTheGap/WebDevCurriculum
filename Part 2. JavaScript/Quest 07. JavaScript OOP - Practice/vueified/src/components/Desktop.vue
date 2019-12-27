<script>
/* eslint-disable no-console */
import Directory from './Directory';

export default {
  name: 'Desktop',
  mixins: [Directory]
};
</script>

<style scoped>
.window {
  background-color: ivory;
  width: 100%;
  height: 100%;
  position: absolute;
}

.window .window {
  position: absolute;
  background-color: white;
  border: 1px solid gray;
  width: 400px;
  height: 340px;
}
</style>