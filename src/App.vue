<script setup>
import { ref, nextTick } from "vue";
import TitleScreen from './components/TitleScreen.vue';
import Game from './components/Game.vue';

let gameActive = ref(false);
let resettingGame = ref(false);
let game = ref(null);
let gamesLeft = ref(0);
let titleScreen = ref(null)

function startFullGame() {
  gamesLeft.value = titleScreen.value.amountGames
  gameActive.value = true;
}

async function gameEnded() {
  gamesLeft.value--
  if(gamesLeft.value > 0) {
    resettingGame.value = true
    await nextTick()
    resettingGame.value = false
  } else {
    gameActive.value = false
  }
}

function gameMounted() {
  game.value.startGame()
}
</script>

<template>

    <TitleScreen @start-game="startFullGame()" v-if="!gameActive" ref="titleScreen"></TitleScreen>

    <Game v-if="gameActive && !resettingGame" ref="game" @game-mounted="gameMounted()" @game-ended="gameEnded()"></Game>

</template>
