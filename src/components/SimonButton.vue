<template>
  <div
    class="simon-button"
    :class="{ active: isActive }"
    :style="{ backgroundColor: color }"
    @click="handleClick"
  ></div>
</template>

<script>
import { Howl } from 'howler';

export default {
  props: {
    color: String,
    isActive: Boolean
  },
  methods: {
    handleClick() {
      const soundPath = require(`@/assets/sounds/${this.color}.mp3`).default;

      const sound = new Howl({
        src: [soundPath]
      });
      sound.play();

      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.simon-button {
  width: 80px;
  height: 80px;
  margin: 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.simon-button.active {
  opacity: 0.9;
}

.simon-button:hover {
  transform: scale(1.1);
}
</style>
