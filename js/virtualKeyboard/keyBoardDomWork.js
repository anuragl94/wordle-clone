const keyboardCharKeyPress = (keyValue) => {
  const isWon = document.getElementById("wonText");
  //no key will be registered if game won
  if (isWon) return;

  //handling enter press on virtual keyboard
  if (keyValue.target.innerText === "ENTER") {
    handlekeyBoardEnter();
    return;
  }

  //handling backspace press on vritual keyboard
  if (keyValue.target.innerText === "<-") {
    handleBackspaceKey();
    return;
  }

  //handling other keyPress on virtual keyboard
  const guessInput = document.getElementById("guess");
  const keyoardInput = guessInput.value + keyValue.target.innerText;
  if (keyoardInput.length <= 5) {
    guessInput.value = guessInput.value + keyValue.target.innerText;
    drawGhostInput(guessInput.value);
  }
};

const handleBackspaceKey = () => {
  const guessInput = document.getElementById("guess");
  const newInputValue = guessInput.value.slice(0, -1);
  guessInput.value = newInputValue;
  console.log(guessInput.value);
  drawGhostInput(newInputValue);
};

const handlekeyBoardEnter = () => {
  const guessInput = document.getElementById("guess");
  if (guessInput.value.length === 5) {
    registerGuess(guessInput.value);
    guessInput.value = "";
    drawGhostInput("");

    //trigger change event
    guessInput.dispatchEvent(new Event("change"));
  }
};

const createDomKeyboard = () => {
  keys.map((keyLine) => {
    const line1 = document.createElement("div");
    keyLine.split(" ").map((key) => {
      const keyBtn = document.createElement("div");
      keyBtn.innerText = key.toUpperCase();

      if (key === "Enter" || key === "<-")
        keyBtn.classList.add("wideKeyBtn", "keyBtn");
      else keyBtn.classList.add("keyBtn");
      keyBtn.setAttribute("id", key.toUpperCase());
      keyBtn.onclick = keyboardCharKeyPress;
      line1.appendChild(keyBtn);
    });

    document.getElementById("virualKeyboard").appendChild(line1);
  });
};

createDomKeyboard();

const updateKeyBoardKeyStatus = () => {
  Object.keys(enteredKeyStatus).map((keyLetter) => {
    //adding perticular class to keyBtn to show the status
    const keyBtn = document.getElementById(keyLetter);

    //removing last applied calss
    keyBtn.classList.remove([
      "keyBtnStatus0",
      "keyBtnStatus1",
      "keyBtnStatus2",
    ]);

    //finally applying status class
    keyBtn.classList.add(
      "keyAnimation",
      `keyBtnStatus${enteredKeyStatus[keyLetter]}`
    );

    //removing animtion class after it ends to apply again
    setTimeout(() => keyBtn.classList.remove("keyAnimation"), 1000);
  });
};
