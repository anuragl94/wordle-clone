let attempts = 6;

const WORD = WORDS[Math.floor(Math.random() *  WORDS.length)];
const el = document.querySelector("#guess");

console.log("Target:", WORD);

function registerGuess(guess) {
    guess = guess.toUpperCase();
    const status = [];
    var freq=new Map();

    for(var i=0;i<WORD.length;i++)
    {
        if(freq.has(WORD[i]))
            freq.set(WORD[i],freq.get(WORD[i])+1)
        else
            freq.set(WORD[i],1)
    }

    for(var i=0;i<guess.length;i++)
    {
        if(guess[i]==WORD[i])
        {
            freq.set(WORD[i],freq.get(WORD[i])-1)
        }
    }
    
    for(var i=0;i<guess.length;i++)
    {
        
        if(guess[i]==WORD[i])
            letterStatus=2;
        else if(guess[i]!=WORD[i] && freq.get(guess[i])>0)
        {
            
            letterStatus=1;
            freq[guess[i]]--;
        }
        else
            letterStatus=0;
        status.push(letterStatus);
        
    }
   
   
    printGuess(guess, status);
    console.log(status);
    return status;
}





var userInput="";
const guessLetters=document.querySelectorAll("button");
const keyboard=document.querySelector(".Keypad")
   
    for(const letter of guessLetters)
    {
        letter.addEventListener('click',(e)=>{
            userInput+=e.target.value
            drawGhostInput(userInput);
            console.log(userInput);
            if (userInput.length === 5) {
                console.log(userInput);
                const result = registerGuess(userInput);
                userInput="";
                drawGhostInput(userInput);
                const reducer = (previousValue, currentValue) => previousValue + currentValue;
                if (result.reduce(reducer) === 10) {
                    keyboard.classList.add("hidden");
                    const victoryMessage = document.createElement("div");
                    victoryMessage.innerText = "You won";
                    document.body.appendChild(victoryMessage);
                }
            } else {
                console.log("Skip this");
            }
        })
    }




