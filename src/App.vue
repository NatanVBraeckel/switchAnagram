<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";
import TitleScreen from './components/TitleScreen.vue';
import Game from './components/Game.vue';
import ConfettiExplosion from "vue-confetti-explosion";

import highScoreAudioFile from './assets/audio/highscore.mp3'
const confettiSound = new Audio(highScoreAudioFile)

let gameActive = ref(false);
let resettingGame = ref(false);
let game = ref(null);
let gamesLeft = ref(0);
let titleScreen = ref(null)
let score = ref(0)
let lastAmountGames = 3
let highScore = localStorage.getItem(`highScore${lastAmountGames}`) ? JSON.parse(localStorage.getItem(`highScore${lastAmountGames}`)) : 0
let showConfetti = ref(false);
let windowWidth = ref(window.innerWidth * 0.9)
let windowHeight = ref(window.innerHeight * 0.9)

async function confetti() {
  showConfetti.value = false; 
  await nextTick()
  confettiSound.play()
  showConfetti.value = true;
}

const updateWindowSize = () => {
  windowWidth.value = window.innerWidth * 0.9;
  windowHeight.value = window.innerHeight * 0.9;
};

onMounted(() => {
  window.addEventListener('resize', updateWindowSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowSize);
});

function startFullGame() {
  gamesLeft.value = titleScreen.value.amountGames
  lastAmountGames = titleScreen.value.amountGames
  gameActive.value = true;
  score.value = 0
}

async function gameEnded() {
  gamesLeft.value--
  console.log("game score =", game.value.score)
  score.value = score.value + game.value.score
  console.log("nieuwe score =", score.value)
  if(gamesLeft.value > 0) {
    resettingGame.value = true
    await nextTick()
    resettingGame.value = false
  } else {
    gameActive.value = false
    await nextTick()
    titleScreen.value.setAmountGames(lastAmountGames)
    checkHighScore()
    score.value = 0
  }
}

function gameMounted() {
  game.value.startGame()
}

function checkHighScore() {
  if(score.value > highScore) {
    console.log("new high score!")
    confetti()
    updateHighScore(score.value)
  }
}

function updateHighScore(newHighScore) {
  let highScoreKey = 'highScore' + lastAmountGames
  localStorage.setItem(highScoreKey, score.value);
  highScore = newHighScore
  titleScreen.value.getHighscore()
}
</script>

<template>

    <TitleScreen @start-game="startFullGame()" v-if="!gameActive" ref="titleScreen"></TitleScreen>

    <Game v-if="gameActive && !resettingGame" ref="game" @game-mounted="gameMounted()" @game-ended="gameEnded()"></Game>

    <ConfettiExplosion class="fade" style="top: 15vh; left: 50%; position: absolute;"
       v-if="showConfetti" :stageHeight="windowHeight" :stageWidth="windowWidth" :duration="3000"/>

</template>

<style scoped>
.fade {
  animation: fade-out 2000ms ease-in both;
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

</style>