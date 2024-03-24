<template>
    <div class="simon-board">
        <simon-button v-for="(color, index) in colors" :key="index" :color="color" :is-active="activeIndex === index"
            @click="handleButtonClick(index)"></simon-button>
    </div>
</template>

<script>
import SimonButton from './SimonButton.vue';

export default {
    components: {
        SimonButton
    },
    props: {
        colors: Array,
        activeIndex: Number
    },
    methods: {
        handleButtonClick(index) {
            this.$emit('button-click', index);
        }
    }
};
</script>

<style scoped>
.simon-board {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.simon-button {
  width: 80px;
  height: 80px;
  border: 2px solid #000;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.simon-button.active {
  background-color: rgba(255, 255, 255, 0.8);
}

.simon-button:hover {
  transform: scale(1.1);
}
</style>