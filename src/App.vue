<template>
  <div class="game-container">
    <canvas ref="gameCanvas" width="800" height="600" class="game-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Game from './game';

const gameCanvas = ref(null);

onMounted(() => {
  const canvas = gameCanvas.value;
  const ctx = canvas.getContext('2d');
  
  const game = new Game(ctx, canvas.width, canvas.height);
  game.start();
});
</script>

<style scoped lang="scss">
.game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
}

.game-canvas {
  border: 1px solid white;
  background-color: #111;
}
</style>
