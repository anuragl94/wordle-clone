let attempts = 6;
let isWon = false;

const WORD = WORDS[Math.floor(Math.random() * WORDS.length)];
const el = document.querySelector("#guess");

console.log("Target:", WORD);

function registerGuess(guess) {
  attempts--;
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

  updateKeyBoardKeyStatus();

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

// document.addEventListener("keyup", function (e) {
//   if (e.key === "Enter") el.dispatchEvent(new Event("change"));
// });

el.addEventListener("change", async function (e) {
  console.log(attempts);

  const userInput = e.target.value;
  if (userInput.length === 5) {
    const isValidWord = await checkValidWord(userInput);

    if (!isValidWord) {
      alert("not a valid word..");
      return;
    }

    const result = registerGuess(userInput);
    e.target.value = "";
    const event = new Event("input");
    e.target.dispatchEvent(event);
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
    console.log(result);
    if (result.reduce(reducer) === 10) {
      el.classList.add("hidden");
      isWon = true;
      const victoryMessage = document.createElement("div");
      victoryMessage.setAttribute("id", "wonText");
      victoryMessage.innerText = "You won...!";
      document.getElementById("ghost-input").classList.add("hidden");
      document.body.appendChild(victoryMessage);
    }
  } else {
    console.log("Skip this");
  }
  if (attempts == 0 && !isWon) {
    document.getElementById("ghost-input").classList.add("hidden");
    el.classList.add("hidden");
    gameOver();
    return;
  }
});

el.addEventListener("input", function (e) {
  if (attempts < 1) return;
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

const gameOver = () => {
  console.log("game over called");
  const div = document.createElement("div");
  div.innerHTML = `<p class="gameOverText" >Game Over...!<br> the correct words is <span style="color:#6aaa63" >${WORD}</span>.</p>`;
  div.classList.add("gameOverDiv");
  ROOT.appendChild(div);
};

const checkValidWord = async (guessWord) => {
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${guessWord}`
    );
    return res.ok;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
