var ele=document.querySelector("#guess");
ele.value="";

ele.focus();

function keyboard_button_click(letter)
{
    // console.log(letter);
    // if(letter=="CANCEL")
    // {
    //     if(ele.value.length>0)
    //     {
    //         ele.value=ele.value.slice(0,ele.value.length-1);
    //     }
    // }
    //  else if(letter!="ENTER")
    //  {
    //     if(ele.value.length<5)
    //     {
    //         ele.value=ele.value+letter;
    //     }
    // }
    // key_pressed(letter);
    // el.focus();

    // el.addEventListener("blur", function(e) {
    //     el.focus();
    // })

    // document.addEventListener("focus", function(e) {
    //     el.focus();
    // })
    key_pressed(letter);
}


function create_row(keys)
{
    var row=document.createElement("div");
    row.classList.add("keyboard_row");
    keys.forEach(function(key){
        const button=document.createElement("button");
        button.innerText=key;
        button.classList.add("keyboard_button");
        button.classList.add(key);
        button.onclick=function(){
            keyboard_button_click(button.innerText);
        };
        row.appendChild(button);
    });
    return row;
}
var keyboard=document.querySelector("#keyboard");
keyboard.appendChild(create_row(["Q","W","E","R","T","Y","U","I","O","P"]));
keyboard.appendChild(create_row(["A","S","D","F","G","H","J","K","L"]));
keyboard.appendChild(create_row(["Z","X","C","V","B","N","M","ENTER","CANCEL"]));