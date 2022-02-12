const ROOT = document.getElementById("root");

function printGuess(guess, status) {
    const el = document.createElement("div");
    el.classList.add("userguess");
    guess.split("").forEach((letter, index) => {
        const letterEl = document.createElement("div");
        letterEl.classList.add("letter");
        letterEl.innerText = letter;
        var button_color="";
        switch (status[index]) {
            case 0: letterEl.classList.add('status0');
            button_color="#787c7e";
                break;
            case 1: letterEl.classList.add('status1');
            button_color="#c9b558";
                break;
            case 2: letterEl.classList.add('status2');
            button_color="#6aaa63";
                break;
        }
        // alternately
        // letterEl.classList.add(`status${status[index]}`);
        el.appendChild(letterEl);
        var button=document.querySelector("."+letter);
        // console.log(button.style.color,button_color);
        if(button.style.backgroundColor=="" || button.style.backgroundColor=="rgb(120, 124, 126)"){
        button.style. backgroundColor = button_color;
    }
    if(button.style.backgroundColor=="rgb(201, 181, 88)" && button_color!="#787c7e")
    {
        button.style. backgroundColor = button_color;
    }
    // console.log(button);
    //     console.log(button.style. backgroundColor);
    // if(button.style.backgroundColor==""

    // });
    ROOT.appendChild(el);})
}

function drawGhostInput(word) {
    word = word.toUpperCase().padEnd(5);
    const ghost = document.getElementById("ghost-input");
    word.split("").forEach((l, i) => ghost.children[i].innerText = l);
}