let attempts = 6;

const WORD = WORDS[Math.floor(Math.random() * WORDS.length)];
const el = document.querySelector("#guess");

console.log("Target:", WORD);

function registerGuess(guess) {
    guess = guess.toUpperCase();
    const status = [];
    const WORD_LETTERS = WORD.split("");
    var count = [];
    window.count = count;

    WORD.split("").forEach(function(letter, index) {
        Boolean(count[letter]) ? count[letter]++ : (count[letter] = 1);
        //count[letter]++;
        //console.log(count[letter] + " " + letter);
    });
    guess.split("").forEach(function(letter, index) {
            const isInPlace = WORD_LETTERS[index] === letter;

            if (isInPlace) {
                count[letter]--;
            }

        })
        //PEACE
        //EPACE
    guess.split("").forEach(function(letter, index) {
        // TODO: handle additional letters when there are duplicates
        let letterStatus;
        // this is for storing status

        const existsInWord = count[letter] > 0;
        const isInPlace = WORD_LETTERS[index] === letter;
        if (isInPlace) {
            letterStatus = 2;
        } else if (existsInWord) {
            letterStatus = 1;
            count[letter]--;
        } else {
            letterStatus = 0;
        }
        status.push(letterStatus);
    })

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