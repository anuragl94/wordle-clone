let attempts = 6;

const WORD = WORDS[Math.floor(Math.random() * WORDS.length)];
const el = document.querySelector("#guess");

console.log("Target:", WORD);



function registerGuess(guess) {
    guess = guess.toUpperCase();
    const status = [];
    const map = {};
    for (let i = 0; i < 5; i++) {
        if (map[WORD[i]]) {
            map[WORD[i]]++;
        } else {
            map[WORD[i]] = 1;
        }
    }
    // console.log(map);
    for (let i = 0; i < 5; i++) {
        if (WORD[i] == guess[i]) {
            status[i] = 2;
            map[WORD[i]]--;
        }
    }
    //   console.log(map);
    for (let i = 0; i < 5; i++) {
        if (status[i] != 2) {
            if (map[guess[i]] > 0) {
                status[i] = 1;
                map[guess[i]]--;

            } else {
                status[i] = 0;
            }
        }
        // console.log(map);
    }

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