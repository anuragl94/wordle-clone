let attempts = 6;
const count = []
let isInPlace 
let ch
const WORD = WORDS[Math.floor(Math.random() *  WORDS.length)];
const el = document.querySelector("#guess");

console.log("Target:", WORD);


function registerGuess(guess) {
    guess = guess.toUpperCase();

    WORD.split("").forEach(function(letter, index){
        ch = letter.charCodeAt(0)
        count[ch] ? count[ch]++ : count[ch] = 1; //checking if count[ch] exsits or not
    })

    const WORD_LETTERS = WORD.split("");

    guess.split("").forEach(function(letter,index){
        isInPlace = WORD_LETTERS[index] === letter;
        ch = letter.charCodeAt(0)
        if(isInPlace) count[ch]--;
    })

    const status = [];
    guess.split("").forEach(function(letter, index) {
        // TODO: handle additional letters when there are duplicates
        let letterStatus;
        ch = letter.charCodeAt(0)
        const existsInGuess = count[ch] > 0;
        isInPlace = WORD_LETTERS[index] === letter;
        if (isInPlace) {
            letterStatus = 2;
        } else if (existsInGuess) {
            letterStatus = 1;
            count[ch]--;
        } else {
            letterStatus = 0;
        }
        status.push(letterStatus);
    })
    printGuess(guess, status);
    return status;
}

el.addEventListener("change", function(e) {
    const userInput = e.target.value;
    if (userInput.length === 5) {
        const result = registerGuess(userInput);
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

