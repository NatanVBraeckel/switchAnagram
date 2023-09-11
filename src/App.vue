<script setup>
import { ref, nextTick } from "vue";
import TitleScreen from './components/TitleScreen.vue';
import Game from './components/Game.vue';

let gameActive = ref(false);
let resettingGame = ref(false);
let game = ref(null);
let gamesLeft = ref(0);
let titleScreen = ref(null)
let score = ref(0)
let lastAmountGames = 3
let highScore = localStorage.getItem(`highScore${lastAmountGames}`) ? JSON.parse(localStorage.getItem(`highScore${lastAmountGames}`)) : 0

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

</template>
