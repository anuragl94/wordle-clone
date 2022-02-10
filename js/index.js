let attempts = 6;

const WORD = WORDS[Math.floor(Math.random() *  WORDS.length)];
const el = document.querySelector("#guess");

console.log("Target:", WORD);

function registerGuess(guess) {
    guess = guess.toUpperCase();
    const status = [];
    const WORD_LETTERS = WORD.split("");


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

    // function to get frequency of each word in string
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
    };


     //calling the function
     var freq = getFrequency(WORD);


     for(let i=0;i<guess.length;i++){
        if(guess[i]===WORD[i])
        {
            console.log("Matched");
            freq[guess[i]]--;
            status[i]=2;
        }
        
    }
    for(let i=0;i<guess.length;i++){
        if (!status[i]) {
            status[i]=0;
        }
        let exists = WORD_LETTERS.indexOf(guess[i])>-1;
        if(guess[i]!==WORD[i] && exists && freq[guess[i]]>0)
        {
            freq[guess[i]]--;
            status[i]=1;
        }
        
        
    }

    for(i=0;i<status.length;i++)
    console.log(status[i]);

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

