const row=["qwertyuiop","asdfghjkl","zxcvbnm"];
for(var i=0;i<row.length;i++){
    const ell=document.createElement("div");
    ell.classList.add("user");
    row[i].split("").forEach((letter)=>{
     const el=document.createElement("button");
     el.classList.add("letter");
     el.innerText=letter;
     ell.appendChild(el);
    });
    console.log(ell);
    const mai=document.querySelector("#root1");
    mai.appendChild(ell);
}