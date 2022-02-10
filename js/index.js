let attempts = 6;

const WORD = WORDS[Math.floor(Math.random() *  WORDS.length)];
const el = document.querySelector("#guess");

console.log("Target:", WORD);

function registerGuess(guess) {
    guess = guess.toUpperCase();
    const temp=WORD;
    const status = [];
    const WORD_LETTERS = temp.split("");
    const GUESS_LETTERS=guess.split("");
    console.log(WORD_LETTERS);
for(let i=0;i<5;i++){
    if(WORD_LETTERS[i]===GUESS_LETTERS[i]){
        status[i]=2;
        let ch=WORD_LETTERS[i];
        let ind=WORD_LETTERS.indexOf(ch);
        WORD_LETTERS[ind]=WORD[i].toLowerCase(ch);
        

    }
}

guess.split("").forEach(function(letter, index) {
        // TODO: handle additional letters when there are duplicates
        let letterStatus;


        const existsInWord = WORD_LETTERS.indexOf(letter) > -1;
        //const isInPlace = WORD_LETTERS[index] === letter;
        //if (isInPlace) {
          //  letterStatus = 2;
        //} else 
        if(existsInWord){
            let ind=WORD_LETTERS.indexOf(letter);
            WORD_LETTERS[ind]=WORD[index].toLowerCase(letter);
        }
        
        if (existsInWord) {
            letterStatus = 1;
        } else {
            letterStatus = 0;
        }

        if(!status[index]){
            status[index]=letterStatus
        }
    
        //status.push(letterStatus);
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
