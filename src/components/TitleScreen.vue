<script setup>
import { onMounted, ref, watch } from 'vue'
import Modal from './Modal.vue';
import { getHighScore as getHighScoreService, resetHighScores, resetHighScore, getHighScoreKeys } from '../services/highscoreService';

const emit = defineEmits(['start-game'])
let amountGames = ref(3);
let highScore = ref(0);
let highScoreKey = 'highScore' + amountGames.value
let showOptions = ref(false)

onMounted(() => {
    getHighscore()
})

function startGame() {
    emit('start-game')
}

function setAmountGames(value) {
    amountGames.value = value
}

function getHighscore() {
    highScore.value = getHighScoreService(highScoreKey)
}

function saveOptions() {
    console.log("options have been saved")
    hideModal()
}

function hideModal() {
    showOptions.value = false
    getHighscore()
}

function showModal() {
    showOptions.value = true
}

watch(amountGames, () => {
    highScoreKey = "highScore" + amountGames.value
    getHighscore()
})

defineExpose({
    amountGames,
    setAmountGames,
    getHighscore
})
</script>

<template>
    <Modal @confirm="saveOptions()" @cancel="hideModal()" v-if="showOptions" :show-cancel="false" :show-confirm="false">
        <div v-for="key in getHighScoreKeys()" class="options_row">
            <p>Reset highscore voor {{ key.replace("highScore", "") }} spellejtes</p>
            <button @click="resetHighScore(key)">Reset</button>
        </div>
        <div class="options_row">
            <p>Reset high scores</p>
            <button @click="resetHighScores()">Reset</button>
        </div>
    </Modal>

    <div class="container">
        <button @click.stop="showModal()" class="options">
            <img src="../assets/cog.svg" alt="options" style="width: 100%; height: 100%;">
        </button>

        <h1>SWITCH</h1>
        <p>Dit is een namaak van het categoriespelletje van het TV-programma Switch.</p>
        <p>Er is een woord, waarvan de letters verwisselt zijn. <br>Aan jou om te raden welk woord het is.</p>

        <p style="margin: 0.2rem">Aantal spelletjes: </p>
        <select name="amountGames" id="amountGames" v-model="amountGames">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
        </select>

        <p>Highscore: {{ highScore }}</p>
        <!-- <input type="number" v-model="amountGames" min="1"> -->

        <button @click="startGame()" class="startgame">Speel</button>
    </div>
</template>

<style scoped>
.options_row {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

.options_row p {
    color: white;
}
.options_row button {
    cursor: pointer;
    border: 1px solid #083853;
    border-radius: 10px;
    color: white;
    background-color: #062c44;
}
button.options {
    height: 3rem;
    width: 3rem;
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
}
button.startgame {
    background-color: lightgreen;
    font-weight: bold;
    text-transform: uppercase;
    padding: 20px;
    border: 2px solid green;
    font-size: 2rem;
    border-radius: 15px;
    cursor: pointer;
}
.container {
    background-color: rgba(0,0,0,0.5);
    position: relative;
    color: white;
    width: 60vw;
    min-width: 80vw;
    max-width: 800px;
    margin: auto;
    margin-top: 1rem;
    text-align: center;
    padding: .5rem;
    border-radius: 10px;
    height: calc(100vh - 2rem);
}

h1, p {
    margin: 1rem;
}

p {
    font-size: .85rem;
}

h1 {
    font-size: 3rem;
}

input, select {
    display: block;
    margin: 0 auto 2rem;
    font-size: 1.5rem;
    width: max-content;
    background-color: black;
    color: white;
    border: 1px solid white;
    border-radius: 5px;
    width: 4rem;
    text-align: center;
}

@media screen and (min-width: 500px) {

    .container {
        background-color: rgba(0,0,0,0.5);
        color: white;
        width: 60vw;
        min-width: 400px;
        max-width: 800px;
        margin: auto;
        margin-top: 1rem;
        text-align: center;
        padding: 1rem;
        border-radius: 10px;
        height: calc(100vh - 2rem);
    }
    
    h1, p {
        margin: 1rem;
    }

    p {
        font-size: 1rem;
    }   

    h1 {
        font-size: 5rem;
    }

    input {
        display: block;
        margin: 2rem auto;
        font-size: 1.5rem;
        width: max-content;
        background-color: #111;
        color: white;
        border: 1px solid white;
        border-radius: 5px;
        width: 4rem;
        text-align: center;
    }
}

</style>