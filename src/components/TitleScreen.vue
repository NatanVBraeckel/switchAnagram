<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['start-game'])
let amountGames = ref(2);

function startGame() {
    emit('start-game')
}

defineExpose({
    amountGames
})
</script>

<template>
    <div class="container">
        <h1>SWITCH</h1>
        <p>Dit is een namaak van het categoriespelletje van het TV-programma Switch.</p>
        <p>Er is een woord, waarvan de letters verwisselt zijn. <br>Aan jou om te raden welk woord het is.</p>

        <input type="number" v-model="amountGames" min="1">

        <button @click="startGame()">Speel</button>
    </div>
</template>

<style scoped>

button {
    background-color: lightgreen;
    font-weight: bold;
    text-transform: uppercase;
    padding: 20px;
    border: 2px solid green;
    font-size: 2rem;
    border-radius: 15px;
}

button:hover {
    cursor: pointer;
}

.container {
    background-color: rgba(0,0,0,0.5);
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

input {
    display: block;
    margin: 2rem auto;
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
    button {
        background-color: lightgreen;
        font-weight: bold;
        text-transform: uppercase;
        padding: 20px;
        border: 2px solid green;
        font-size: 2rem;
        border-radius: 15px;
    }

    button:hover {
        cursor: pointer;
    }

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