let attempts = 6;

const WORD =WORDS[Math.floor(Math.random() *  WORDS.length)];
const el = document.querySelector("#guess");
console.log("Target:", WORD);

function getFrequency(string) {
    var freq = {};
    for (var i=0; i<string.length;i++) {
        var character = string.charAt(i);
        if (freq[character]) {
           freq[character]++;
        } else {
           freq[character] = 1;
        }
    }

    return freq;
}

function registerGuess(guess) {
    guess = guess.toUpperCase();
    const status = [];


    

    var freq = getFrequency(WORD);;
    console.log(freq);
    // console.log(freq);
    // guess.split("").forEach(function(letter, index) {
    //     // TODO: handle additional letters when there are duplicates
    //     let letterStatus;
    //     const existsInWord = WORD_LETTERS.indexOf(letter) > -1;
    //     const isInPlace = WORD_LETTERS[index] === letter;
    //     if (isInPlace) {
    //         letterStatus = 2;
    //     } else if (existsInWord) {
    //         letterStatus = 1;
    //     } else {
    //         letterStatus = 0;
    //     }
    //     status.push(letterStatus);
    // })

    let letterStatus;
    for(let i=0;i<guess.length;i++){
        if(WORD[i] === guess[i]){
            freq[guess[i]]--;
        }
    }
    
    for(let i=0;i<guess.length;i++){
        if(WORD[i] === guess[i]){
            letterStatus=2;
        }
        else if(WORD[i]!=guess[i] && freq[guess[i]]>0){
            freq[guess[i]]--;
            letterStatus=1;
        }else{
            letterStatus=0;
        }
        status.push(letterStatus);
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
