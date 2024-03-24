<template>
  <div id="app"
    style="background-color: black; color: white; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <h1>Simon The Game</h1>
    <SimonBoard :colors="colors" :active-index="activeIndex" :play-sound="playSound" @button-click="handleButtonClick">
    </SimonBoard>
    <div class="controls">
      <button @click="startGame" style="width: 120px; height: 40px; border-radius: 20px;">Start</button>
      <button @click="resetGame" style="width: 120px; height: 40px; border-radius: 20px;">Reset</button>
    </div>
    <div class="difficulty" style="margin-bottom: 10px;">
      <label>Difficulty:</label>
      <select v-model="difficulty" style="width: 120px; height: 20px;">
        <option value="easy">Easy</option>
        <option value="normal">Normal</option>
        <option value="hard">Hard</option>
      </select>
    </div>
    <div class="notification" v-if="notification" style="margin-top: 10px;">{{ notification }}</div>
  </div>
</template>

<script>
import SimonBoard from './components/SimonBoard.vue';
import { Howl } from 'howler';

export default {
  name: 'App',
  components: {
    SimonBoard
  },
  data() {
    return {
      colors: ['red', 'blue', 'green', 'yellow'],
      sequence: [],
      playerSequence: [],
      activeIndex: null,
      notification: '',
      difficulty: 'easy',
      difficultyMap: {
        easy: 1500,
        normal: 1000,
        hard: 400
      }
    };
  },
  methods: {
    startGame() {
      this.sequence = [];
      this.playSequence();
    },
    resetGame() {
      this.sequence = [];
      this.playerSequence = [];
      this.activeIndex = null;
      this.notification = '';
    },
    playSequence() {
      const delay = this.difficultyMap[this.difficulty];
      this.sequence.push(Math.floor(Math.random() * this.colors.length));
      this.sequence.forEach((colorIndex, index) => {
        setTimeout(() => {
          this.activeIndex = colorIndex;
          this.playSound(colorIndex);
          setTimeout(() => {
            this.activeIndex = null;
            if (index === this.sequence.length - 1) {
              this.playerSequence = [];
            }
          }, delay - 200);
        }, index * delay);
      });
    },
    handleButtonClick(index) {
      this.playerSequence.push(index);
      this.playSound(index);
      if (this.playerSequence.length === this.sequence.length) {
        if (JSON.stringify(this.playerSequence) === JSON.stringify(this.sequence)) {
          this.notification = 'Correct!';
          setTimeout(() => {
            this.notification = '';
            this.playSequence();
          }, 1000);
        } else {
          this.notification = 'Incorrect! Game Over.';
          setTimeout(() => {
            this.notification = '';
            this.resetGame();
          }, 2000);
        }
      }
    },
    playSound(index) {
      const sound = new Howl({
        src: [`@/assets/sounds/${this.colors[index]}.mp3`]
      });
      sound.play();
    }
  }
};
</script>

<style>
.controls,
.difficulty,
.notification {
  text-align: center;
  padding: 20px;
}
</style>
