function make_row(message){
const row=document.createElement("div");
message.split("").forEach(function(letter)
{
    const button=document.createElement("button");
    button.innerText=letter;
    button.classList.add("button");
    // button.onclick=function(ev){
    //     console.log(button.innerText);
    //     const word=document.querySelector("#guess");
    //     word.value=word.value+button.innerText;
    //     console.log(word.value);
    //     drawGhostInput(word.value);
    // }
    row.appendChild(button);
});
return row;
}
const row1=document.createElement("div");
row1.appendChild(make_row("QWERTYUIOP"));
const row2=document.createElement("div");
row2.appendChild(make_row("ASDFGHJKL"));
const row3=document.createElement("div");
row3.appendChild(make_row("ZXCVBNM"));
const keyboard=document.querySelector("#keyboard");
keyboard.appendChild(row1);
keyboard.appendChild(row2);
keyboard.appendChild(row3);