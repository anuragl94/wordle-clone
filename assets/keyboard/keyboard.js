function make_row(message){
const row=document.createElement("div");
const el = document.querySelector("#guess");
var input_event = new Event('input', {
            bubbles: true,
            cancelable: true,
});
var change_event=new Event('change',{
    bubbles:true,
    cancelable:true,
});

el.value="";


message.forEach(function(letter)
{
    const button=document.createElement("button");
    button.innerText=letter;
    button.classList.add("button");
     button.onclick=function(ev){
         console.log(button.innerText);
        //  const el = document.querySelector("#guess");
        //  el.focus();
        //  el.addEventListener("blur", function(e) {
        //     el.focus();
        // })
        
        // document.addEventListener("focus", function(e) {
        //     el.focus();
        // })
        button.style.backgroundColor="#e7e7e7";
        if(letter==="CANCEL")
        {
            if(el.value.length>0){
            el.value=el.value.slice(0,el.value.length-1);
            console.log(el.value);
            el.dispatchEvent(input_event);}
        }
        else if(letter==="ENTER"){
            el.dispatchEvent(change_event);
        }
        else{
        el.value=el.value+letter;
        el.dispatchEvent(input_event);
    }
    el.focus();
     }
    row.appendChild(button);
});
return row;
}
const row1=document.createElement("div");
row1.appendChild(make_row(["Q","W","E","R","T","Y","U","I","O","P"]));
const row2=document.createElement("div");
row2.appendChild(make_row(["A","S","D","F","G","H","J","K","L"]));
const row3=document.createElement("div");
row3.appendChild(make_row(["Z","X","C","V","B","N","M","ENTER","CANCEL"]));
const keyboard=document.querySelector("#keyboard");
keyboard.appendChild(row1);
keyboard.appendChild(row2);
keyboard.appendChild(row3);