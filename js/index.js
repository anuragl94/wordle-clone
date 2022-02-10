let attempts = 6;

const WORD = 'FADEF' //WORDS[Math.floor(Math.random() *  WORDS.length)];
const el = document.querySelector("#guess");

console.log("Target:", WORD);

function registerGuess(guess) {
    guess = guess.toUpperCase();
    const status = [];
    const freq={};
    for(const i of WORD){
        if(freq[i]){
            freq[i]+=1;
        }
        else{
            freq[i]=1;
        }
    }
    console.log(freq);
    for(var i=0;i<guess.length;i++)
    {
        if(guess[i]==WORD[i])
            freq[WORD[i]]--;
    }
    for(var i=0;i<guess.length;i++)
    {
        if(guess[i]==WORD[i]){
            letterStatus=2;
        }
        else if(guess[i]!=WORD[i] && freq[guess[i]]>0)
        {
            letterStatus=1;
            freq[guess[i]]--;
        }
        else
            letterStatus=0;
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
