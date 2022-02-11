let attempts = 6;

const WORD = WORDS[Math.floor(Math.random() *  WORDS.length)];
const LETTER_FREQ = WORD.split("").reduce((prev, cur) => ({
    ...prev,
    [cur]: 1 + (prev[cur] || 0)
}));

const el = document.querySelector("#guess");

console.log("Target:", WORD);

function registerGuess(guess) {
    guess = guess.toUpperCase();
    const guessedLetters = guess.split("");
    const status = Array(guessedLetters.length).fill(0);
    const WORD_LETTERS = WORD.split("");
    let currentLetterFreq = { ...LETTER_FREQ };
    guessedLetters.forEach(function(letter, index) {
        const isInPlace = WORD_LETTERS[index] === letter;
        if (isInPlace) {
            status[index] = 2;
            currentLetterFreq[letter]--;
        }
    })
    guessedLetters.forEach(function(letter, index) {
        // TODO: handle additional letters when there are duplicates
        let letterStatus = status[index];
        const existsInWord = WORD_LETTERS.indexOf(letter) > -1;
        if (letterStatus === 2) {
            // continue
            return;
        } else if (existsInWord && currentLetterFreq[letter] > 0) {
            letterStatus = 1;
            currentLetterFreq[letter]--;
        } else {
            letterStatus = 0;
        }
        status[index] = letterStatus;
    });
    printGuess(guess, status);
    return status;
}

el.focus();

el.addEventListener("blur", function(e) {
    el.focus();
})

document.addEventListener("focus", function(e) {
    el.focus();
})

el.addEventListener("change", function(e) {
    const userInput = e.target.value;
    if (userInput.length === 5) {
        const result = registerGuess(userInput);
        e.target.value = "";
        const event = new Event('input');
        e.target.dispatchEvent(event);
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        if (result.reduce(reducer) === 10) {
            el.classList.add("hidden");
            const victoryMessage = document.createElement("div");
            victoryMessage.innerText = "You won";
            document.body.appendChild(victoryMessage);
        }
    } else {
        console.log("Skip this");
    }
});

el.addEventListener("input", function(e) {
    const userInput = e.target.value;
    drawGhostInput(userInput);
});
