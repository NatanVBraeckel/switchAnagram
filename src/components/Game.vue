<script setup>
import { nextTick, onMounted, ref, watch, onBeforeUnmount } from 'vue'

//sounds
import revealAudioFile from '../assets/audio/pong.mp3'
import bonkAudioFile from '../assets/audio/bonk.mp3'
import dingAudioFile from '../assets/audio/success.mp3'
import lostAudioFile from '../assets/audio/lost.mp3'

const reveal = new Audio(revealAudioFile)
const bonk = new Audio(bonkAudioFile)
const ding = new Audio(dingAudioFile)
const lost = new Audio(lostAudioFile)

const emit = defineEmits(['game-mounted', 'game-ended'])
let word = ref(null);
let scrambledWord = ref(null);
let answerWord = ref([]);
let answerLetters = ref([]);
let lettersLeft = ref(null);
let input = ref('');
const inputElement = ref(null);
let letterInterval = ref(null);
let inputWidth = 0;
let score = ref(0);

onMounted(() => {
    emit('game-mounted');
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', calcInputWidth);
});

const scramble = (word) => {
    let strarray = word.value.split('');           
    var i,j,k
    for (i = 0; i < strarray.length; i++) {
      j = Math.floor(Math.random() * i)
      k = strarray[i]
      strarray[i] = strarray[j]
      strarray[j] = k
    }
    word = strarray.join('');  
    return word;
}

const calcInputWidth = () => {
  if(window.innerWidth > 1000) {
        inputWidth = word.value.length * 4
    } else {
        inputWidth = word.value.length * 2
    }
};

function playSound(audio) {
    audio.play()
}

function addScore() {
    score.value = lettersLeft.value * 100
}

async function startGame() {
    word.value = await getWord();
    console.log(`%c${word.value}`, 'color: #2be0e3');

    await nextTick()

    calcInputWidth()
    window.addEventListener('resize', calcInputWidth);
    inputElement.value.focus()

    answerWord.value = word.value.split('');
    answerLetters.value = Array.from(answerWord.value, value => [value, false]);
    // console.log("answerletters = ", answerLetters.value)
    // console.log(answerWord.value);
    //de indexes van de letters bij in de array zetten
    for(let i = 0; i < answerWord.value.length; i++) {
        answerWord.value[i] = [answerWord.value[i], i];
    }

    scrambledWord.value = scramble(word);
    lettersLeft.value = word.value.length;

    letterInterval = setInterval(() => {
        revealLetter()
    }, 4000);

    watch(lettersLeft, () => {
        if(lettersLeft.value == 0) {
            //console.error("geen letters meer g");
            playSound(lost)
            endGame();
        }
    })
}

async function getWord() {
    return fetch("https://random-words-api.vercel.app/word/dutch")
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data[0].word.toLowerCase();
        });
}

function revealLetter() {
    //random letter pos uitkiezen
    let indexRandom = Math.floor(Math.random()*answerWord.value.length)
    let random = answerWord.value[indexRandom];
    //zetten dat de letter revealed mag worden
    answerLetters.value[random[1]][1] = true;
    //revealde letter uit array halen
    answerWord.value.splice(indexRandom, 1);

    lettersLeft.value--;
    
    if(lettersLeft.value > 0) {
        playSound(reveal)
    }
}

function revealWord() {
    answerLetters.value.forEach(element => {
        element[1] = true;
    });
}

function checkInput() {
    // console.log("input value =", input.value)
    // console.log("word value =", word)

    if(input.value.toLowerCase() == word.value) {
        //console.log("juist")
        playSound(ding)
        revealWord()
        addScore()
        endGame()
    } else {
        playSound(bonk)
        //console.log("fout")
    }

    input.value = '';
}

function endGame() {
    //console.log("game ended")
    clearInterval(letterInterval)
    setTimeout(() => {
        emit('game-ended')
    }, 2000);
}

defineExpose({
    startGame,
    score
})
</script>

<template>
    <div class="container">
        <section v-if="word">
            <div class="anagram">
                <img src="../assets/hoek.svg" id="topleft">
                <img src="../assets/hoek.svg" id="topright">
                <img src="../assets/hoek.svg" id="bottomleft">
                <img src="../assets/hoek.svg" id="bottomright">
                <div class="word">
                    <span v-for="char in scrambledWord">{{ char }}</span>
                </div>
            </div>
            <div class="answer">
                <div v-for="letter in answerLetters">
                    <div class="square" v-if="!letter[1]"></div>
                    <span v-else>{{ letter[0] }}</span>
                </div>
            </div>
        </section>

        <form @submit.prevent="checkInput" v-if="word">
            <input type="text" v-model.trim="input" ref="inputElement" :style="{ width: inputWidth + 'rem' }">
        </form>
    </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@400;600&display=swap");

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5rem;
    margin-top: 5rem;
}

section {
    font-family: "Noto Sans Mono", monospace;
    font-size: 1.75rem;
    text-transform: uppercase;
    color: #f2e1c2;
    display: inline-block;
    margin: auto;
}
section span {
    width: 1rem;
}
.anagram {
    position: relative;
    padding: 0.4rem 1rem;
    justify-content: space-between;
    margin-bottom: 3rem;

    animation: expand 750ms cubic-bezier(0.25, 0.1, 0.25, 1) both;
    margin-inline: auto;
}
.anagram .word {
    display: flex;
    gap: .75rem;
    animation: fade-in 750ms ease both;
    animation-delay: 600ms;
}

.anagram img {
    height: 1.25rem;
    width: auto;
    position: absolute;
}
.anagram img#topleft {
    top: -0.5rem;
    left: -1rem;
}
.anagram img#topright {
    top: -0.5rem;
    right: -1rem;
    transform: rotate(90deg);
}
.anagram img#bottomleft {
    bottom: -0.5rem;
    left: -1rem;
    transform: rotate(270deg);
}
.anagram img#bottomright {
    bottom: -0.5rem;
    right: -1rem;
    transform: rotate(180deg);
}
section .answer {
  padding-inline: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
}
.square {
  height: .5rem;
  width: .5rem;
  margin-inline: 0.25rem;
  background-color: #D5400A;
  border-radius: 2px;
}

form {
    display: flex;
    justify-content: center;
    animation: fade-in 1s ease both;
}

form input {
  font-family: "Noto Sans Mono", monospace;
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  color: #f2e1c2;
  border-radius: 10px;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
}

@media screen and (min-width: 1000px) {
    section {
        font-size: 3.5rem;
    }
    section span {
        width: 2rem;
    }
    .anagram {
        padding: 0.8rem 2rem;
    }
    .anagram .word {
        gap: 1.5rem;
    }

    .anagram img {
        height: 2.5rem;
    }
    section .answer {
    padding-inline: 2rem;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    height: 76px;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    }
    .square {
        height: 1rem;
        width: 1rem;
        margin-inline: 0.5rem;
        border-radius: 4px;
    }

    form input {
    font-size: 3rem;
    padding: 0.5rem;
    }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes expand {
    from {
        width: 6rem;
    }
    to {
        width: 100%;
    }
}

</style>