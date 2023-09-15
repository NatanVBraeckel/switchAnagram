function getHighScore(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : 0
}

function updateHighScore(key, newScore) {
    localStorage.setItem(key, newScore);
}

function resetHighScore(key) {
    localStorage.setItem(key, 0)
}

function getHighScoreKeys() {
    const keys = Object.keys(localStorage);

    // Custom sorting function to order keys numerically
    const sortedKeys = keys.sort((a, b) => {
        const numA = parseInt(a.match(/highScore(\d+)/)?.[1] || "0");
        const numB = parseInt(b.match(/highScore(\d+)/)?.[1] || "0");

        return numA - numB;
    });

    return sortedKeys.filter(key => key.startsWith('highScore'));
}

function resetHighScores() {
    const keys = Object.keys(localStorage);
    const highScoreKeys = keys.filter(key => key.startsWith('highScore'));
    highScoreKeys.forEach(key => {
        localStorage.setItem(key, 0)
    });
}

export { getHighScore, updateHighScore, resetHighScore, resetHighScores, getHighScoreKeys }