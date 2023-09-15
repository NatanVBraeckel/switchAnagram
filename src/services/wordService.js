const wordFileNames = ['words_length_5.txt',
                        'words_length_6.txt',
                        'words_length_7.txt',
                        'words_length_8.txt',
                        'words_length_9.txt',
                        'words_length_10.txt',
                        'words_length_11.txt',
                        'words_length_12.txt',];

async function getWordOfRandomLength() {
    const randomIndex = Math.floor(Math.random() * wordFileNames.length);
    const randomFileName = wordFileNames[randomIndex];
    const filePath = `/words/${randomFileName}`

    const response = await fetch(filePath);

    if (!response.ok) {
        throw new Error('Failed to fetch random word file');
    }
  
    const wordFileContent = await response.text();
    const words = wordFileContent.split('\n');

    const randomWordIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomWordIndex].trim().toLowerCase();

    return randomWord
};

async function getWordOfLength(length) {
    const filePath = `/words/words_length_${length}.txt`

    const response = await fetch(filePath);

    if (!response.ok) {
        throw new Error(`Failed to fetch word file with length ${length}`);
    }
  
    const wordFileContent = await response.text();
    const words = wordFileContent.split('\n');

    const randomWordIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomWordIndex].trim().toLowerCase();

    return randomWord
}

async function getWordFromApi() {
    return fetch("https://random-words-api.vercel.app/word/dutch")
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data[0].word.toLowerCase();
        });
}

function setChosenWordFunction(wordFunctionString) {
    localStorage.setItem('wordFunction', wordFunctionString)
}

function setChosenWordLength(wordLengthInt) {
    localStorage.setItem('wordLength', wordLengthInt)
}

function getChosenWordFunction() {
    return localStorage.getItem('wordFunction') ?? 'api'
}

function getChosenWordLength() {
    return localStorage.getItem('wordLength') ?? 5
}

export { getWordOfRandomLength, getWordOfLength, getWordFromApi, setChosenWordFunction,
     getChosenWordFunction, setChosenWordLength, getChosenWordLength };