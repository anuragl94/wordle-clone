let attempts = 6;

const WORD = WORDS[Math.floor(Math.random() *  WORDS.length)];
function LETTER_FREQ(words)
{
    var words_map=new Map();
    words.forEach(function(letter)
    {
        if(words_map.has(letter))
        {
            words_map.set(letter,words_map.get(letter)+1);
        }
        else{
            words_map.set(letter,1);
        }
    });
    return words_map;
}

const el = document.querySelector("#guess");

console.log("Target:", WORD);

function key_pressed(key)
{
    if(key=="CANCEL" || key=="Backspace")
    {
        if(el.value.length>0)
        {
            el.value=el.value.slice(0,el.value.length-(el==document.activeElement?0:1));
        }
        input_event();
    }
    else if(key=="Enter" || key=="ENTER")
    {
        change_event();
    }
    else{
        if(el.value.length<5)
        {
            // el.value=el.value+(key.length>1?key.slice(3,4).toLowerCase():key);
            if(key.length>1 && el==document.activeElement)
            {
                //  el.value=el.value+(key.length>1?key.slice(3,4).toLowerCase():key);
                // console.log("in focus");
            }
            else{
                el.value=el.value+(key.length>1?key.slice(3,4).toLowerCase():key);
            
        }}
        input_event();
    }
    el.focus();

    el.addEventListener("blur", function(e) {
        el.focus();
    })

    document.addEventListener("focus", function(e) {
        el.focus();
    })
}

document.addEventListener("keyup",function(e)
{
    key_pressed(`${e.code}`);
})

function registerGuess(guess) {
    guess = guess.toUpperCase();
    const guessedLetters = guess.split("");
    const status = Array(guessedLetters.length).fill(0);
    const WORD_LETTERS = WORD.split("");
    let currentLetterFreq = LETTER_FREQ(WORD_LETTERS);
    guessedLetters.forEach(function(letter, index) {
        const isInPlace = WORD_LETTERS[index] === letter;
        if (isInPlace) {
            status[index] = 2;
            currentLetterFreq.set(letter,currentLetterFreq.get(letter)-1);
        }
    })
    //console.log(status);
    //console.log(currentLetterFreq);
    guessedLetters.forEach(function(letter, index) {
        // TODO: handle additional letters when there are duplicates
        let letterStatus = status[index];
        const existsInWord = WORD_LETTERS.indexOf(letter) > -1;
        if (letterStatus === 2) {
            // continue
            return;
        } else if (existsInWord && currentLetterFreq.get(letter) > 0) {
            letterStatus = 1;
            currentLetterFreq.set(letter,currentLetterFreq.get(letter)-1);
        } else {
            letterStatus = 0;
        }
        status[index] = letterStatus;
    });
    printGuess(guess, status);
    //console.log(status);
    return status;
}

el.focus();

el.addEventListener("blur", function(e) {
    el.focus();
})

document.addEventListener("focus", function(e) {
    el.focus();
})

function change_event(){
    attempts=attempts-1;
    //console.log("change event");
    const userInput = el.value;
    if (userInput.length === 5) {
        const result = registerGuess(userInput);
        el.value = "";
        // const event = new Event('input');
        // e.target.dispatchEvent(event);
        input_event();
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        if (result.reduce(reducer) === 10) {
            el.classList.add("hidden");
            var ghost_input=document.querySelector("#ghost-input");
            ghost_input.classList.add("hidden");
            const victoryMessage = document.createElement("div");
            victoryMessage.innerText = "You won";
            document.body.appendChild(victoryMessage);
        }
    } else {
        console.log("Skip this");
    }
    if(attempts<=0)
    {
        el.classList.add("hidden");
        var ghost=document.querySelector("#ghost-input");
        ghost.classList.add("hidden");
        const victoryMessage = document.createElement("div");
        victoryMessage.innerText = "go back LOSER!!";
        document.body.appendChild(victoryMessage);
    }
}

function input_event() {
    //console.log("input event");
    const userInput = el.value;
    drawGhostInput(userInput);
}
