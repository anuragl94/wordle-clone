let attempts = 6;
let userInput="";
console.log("Hello")
const WORD = WORDS[Math.floor(Math.random() *  WORDS.length)];
const el = document.querySelector("#guess");
const KeyboardBtn = document.querySelectorAll("button");


KeyboardBtn.forEach((key)=>{
    key.addEventListener("click",function(e){
        userInput+=e.target.value;
        drawGhostInput(userInput);
        if (userInput.length === 5) {
            drawGhostInput("");         // setting the new input to 0
            const result = registerGuess(userInput);
            userInput="";
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
            console.l
        } else {
            console.log("Skip this");
        }
    })
})

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
