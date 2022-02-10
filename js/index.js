// let attempts = 6;

// const WORD = WORDS[Math.floor(Math.random() *  WORDS.length)];
// const el = document.querySelector("#guess");

// console.log("Target:", WORD);

// function registerGuess(guess) {
//     guess = guess.toUpperCase();
//     const status = [];
//     const WORD_LETTERS = WORD.split("");
//     guess.split("").forEach(function(letter, index) {
//         // TODO: handle additional letters when there are duplicates

//         let letterStatus;
//         const existsInWord = WORD_LETTERS.indexOf(letter) > -1;
//         const isInPlace = WORD_LETTERS[index] === letter;
//         if (isInPlace) {
//             letterStatus = 2;
//         } else if (existsInWord) {
//             letterStatus = 1;
//         } else {
//             letterStatus = 0;
//         }
//         status.push(letterStatus);
//     })
//     printGuess(guess, status);
//     return status;
// }

// el.focus();

// el.addEventListener("blur", function(e) {
//     el.focus();
// })

// document.addEventListener("focus", function(e) {
//     el.focus();
// })

// el.addEventListener("change", function(e) {
//     const userInput = e.target.value;
//     if (userInput.length === 5) {
//         const result = registerGuess(userInput);
//         e.target.value = "";
//         const event = new Event('input');
//         e.target.dispatchEvent(event);
//         const reducer = (previousValue, currentValue) => previousValue + currentValue;
//         if (result.reduce(reducer) === 10) {
//             el.classList.add("hidden");
//             const victoryMessage = document.createElement("div");
//             victoryMessage.innerText = "You won";
//             document.body.appendChild(victoryMessage);
//         }
//     } else {
//         console.log("Skip this");
//     }
// });

// el.addEventListener("input", function(e) {
//     const userInput = e.target.value;
//     drawGhostInput(userInput);
// });










let attempts = 6;

// const WORD = WORDS[Math.floor(Math.random() *  WORDS.length)];
const WORD = "CLIFF"
const el = document.querySelector("#guess");

console.log("Target:", WORD);

function registerGuess(guess) {

    let counter = new Map();
 
    for(let i=0;i<WORD.length;i++)
    {
        counter[WORD[i]]=0;
    }
    
    for(let i=0;i<WORD.length;i++)
    {
        counter[WORD[i]]++;
    }
    
    guess = guess.toUpperCase();

    for(let i=0;i<guess.length;i++){
        if(guess[i]==WORD[i])               // INPLace  checking
            counter[guess[i]]--;
    }

    const status = [];
    for(let i=0;i<guess.length;i++){
        console.log(guess[i])
        let letterStatus;
        if(guess[i]==WORD[i]){
            letterStatus=2;
        }
        else if(counter[guess[i]]>0){
            letterStatus=1;
            counter[guess[i]]--;
        }
        else{
            letterStatus=0;
        }   
        console.log(letterStatus)
        status.push(letterStatus)
    }
    
    printGuess(guess, status);
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
    return status;
}

el.addEventListener("change", function(e) {
    console.log("hello")
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

