let attempts = 6;

const WORD = WORDS[Math.floor(Math.random() * WORDS.length)];
const el = document.querySelector("#guess");

console.log("Target:", WORD);

function registerGuess(guess) {
  guess = guess.toUpperCase();
  const status = [];
  const WORD_LETTERS = WORD.split("");

  //storing the frequencies of each letter
  const WORD_FREQ = arrayElementsFrequency(WORD.split(""));
  const GUESS_FREQ = arrayElementsFrequency(guess.split(""));

  guess.split("").forEach(function (letter, index) {
    // TODO: handle additional letters when there are duplicates
    let letterStatus;
    const existsInWord = WORD_LETTERS.indexOf(letter) > -1;
    const isInPlace = WORD_LETTERS[index] === letter;
    if (isInPlace) {
      letterStatus = 2;
    } else if (existsInWord && WORD_FREQ[letter] === GUESS_FREQ[letter]) {
      letterStatus = 1;
    } else if (existsInWord && WORD_FREQ[letter] < GUESS_FREQ[letter]) {
      GUESS_FREQ[letter] -= 1;
      letterStatus = 0;
    } else {
      letterStatus = 0;
    }
    enteredKeyStatus[letter] = letterStatus;
    status.push(letterStatus);
  });

  //updating key status for keyboard
  
  updateKeyBoardKeyStatus()

  printGuess(guess, status);
  return status;
}

el.focus();

el.addEventListener("blur", function (e) {
  el.focus();
});

document.addEventListener("focus", function (e) {
  el.focus();
});

el.addEventListener("change", function (e) {
  const userInput = e.target.value;
  if (userInput.length === 5) {
    const result = registerGuess(userInput);
    e.target.value = "";
    const event = new Event("input");
    e.target.dispatchEvent(event);
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
      console.log(result)
    if (result.reduce(reducer) === 10) {
      el.classList.add("hidden");
      const victoryMessage = document.createElement("div");
      victoryMessage.setAttribute('id','wonText')
      victoryMessage.innerText = "You won...!";
      document.body.appendChild(victoryMessage);
    }
  } else {
    console.log("Skip this");
  }
});

el.addEventListener("input", function (e) {
  const userInput = e.target.value;
  drawGhostInput(userInput);
});

//returns array elements frequencies
const arrayElementsFrequency = (array) => {
  let frequency = {};
  array.map((letter) => {
    frequency[letter] ? frequency[letter]++ : (frequency[letter] = 1);
  });

  return frequency;
};
