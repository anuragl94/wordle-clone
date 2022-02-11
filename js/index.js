let attempts = 6;

const str1 = WORDS[Math.floor(Math.random() *  WORDS.length)];
const el = document.querySelector("#guess");
str12=str1.toLowerCase();
console.log("Target:", str1);
const tar=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
for(var i=0;i<str12.length;i++)
    tar[str12.charCodeAt(i)-97]+=1;

function registerGuess(guess) {
    gue = guess.toLowerCase();
    const control=[0,0,0,0,0]
    const gues=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
for(var i=0;i<gue.length;i++)
    gues[gue.charCodeAt(i)-97]+=1
var limit=-100;
for(var i=0;i<26;i++){
    if(tar[i]>0 && gues[i]>0){
        if(tar[i]>=gues[i])
            limit=gues[i]
        else
            limit=tar[i]
        c=0
        for(var j=0;j<5;j++){
            if((gue[j]==String.fromCharCode(i+97) && gue[j]==str12[j])){
                control[j]=2
                c+=1
            }
        }
        k=0
        while(c<limit && k<=4){
            if(control[k]==0 && gue[k]==String.fromCharCode(i+97)){
                control[k]=1
                c+=1
            }
            k+=1
        }
    }
}
console.log(control);
    printGuess(gue, control);
    return control;
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
