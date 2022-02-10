let attempts = 6;

const WORD = WORDS[Math.floor(Math.random() *  WORDS.length)];
// const WORD="CLIFF";
const el = document.querySelector("#guess");

//=======================================

//THis function is for map with set of indexes
function create_map(word){
var WORD_DICT=new Map();
word.split("").forEach(function(letter,index){
    if(WORD_DICT.has(letter))
    {
        var temp_arr=WORD_DICT.get(letter);
        temp_arr.add(index);
        WORD_DICT.set(letter,temp_arr);
    }
    else{
        WORD_DICT.set(letter,new Set().add(index));
    }
});
return WORD_DICT;}



//This function is for map with frequencies
function create_map_count(word){
    var WORD_DICT=new Map();
    word.split("").forEach(function(letter){
        if(WORD_DICT.has(letter))
        {
            WORD_DICT.set(letter,WORD_DICT.get(letter)+1);
        }
        else{
            WORD_DICT.set(letter,1);
        }
    });
    return WORD_DICT;}

//=======================================
 

// console.log("Target:", WORD);

//=========================================


var word_map=create_map(WORD);
var word_count=create_map_count(WORD);
// console.log(word_map);
// console.log(word_count);

function intersection(set1,set2)
{
    var intersectionSet = new Set();
    for(var elem of set2)
    {
        if(set1.has(elem))
            intersectionSet.add(elem);
    }
return intersectionSet;               
}


//To deal with the Green ones
function check_red(mapped,status,ref_word_count)
{
    var common=new Map();
    for(var key of mapped.keys())
    {
        var guess_set=mapped.get(key);
        var word_set=word_map.has(key) ? word_map.get(key) : new Set();
        intersection(guess_set,word_set).forEach(function(index){
            status[index]=2;
            ref_word_count.set(key,ref_word_count.get(key)-1);
        })
        // console.log(word_count);
    }
    return status;
}


//=========================================




function registerGuess(guess) {
    if(guess==="show")
    {
        console.log("Target:", WORD);
    }
    var ref_word_count=new Map(word_count);
    guess = guess.toUpperCase();
    var status = [0,0,0,0,0];
    const WORD_LETTERS = WORD.split("");
    var mapped=create_map(guess);
    status=check_red(mapped,status,ref_word_count);
    // console.log(word_count);
    // console.log(status);
    guess.split("").forEach(function(letter,index)
    {
        if(ref_word_count.get(letter)>0 && status[index]<2)
        {
            ref_word_count.set(letter,ref_word_count.get(letter)-1);
            status[index]=1;
        }
    })
    // console.log(word_count);
    // console.log(ref_word_count);
    console.log(status);
    printGuess(guess,status);
    return status;

    // guess.split("").forEach(function(letter, index) {
    //     // TODO: handle additional letters when there are duplicates
    //     let letterStatus;
    //     const existsInWord = WORD_LETTERS.indexOf(letter) > -1;
    //     const isInPlace = WORD_LETTERS[index] === letter;
    //     if (isInPlace) {
    //         letterStatus = 2;
    //     } else if (existsInWord) {
    //         letterStatus = 1;
    //     } else {
    //         letterStatus = 0;
    //     }
    //     status[index]=letterStatus;
    // })
    // printGuess(guess, status);
    // return status;
}

el.addEventListener("change", function(e) {
    const userInput = e.target.value;
    if (userInput.length === 5) {
        const result = registerGuess(userInput);
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

