
var words = [
    "color",
    "masks",
    "trail",
    "wordy",
    "table",
    "desks",
    "sheet",
    "photo",
    "birth",
    "guilt",
    "float",
    "mouse",
    "snake",
    "eager",
    "topaz",
    "topic",
    "break",
    "earth",
    "brass",
    "phone",
    "place",
    "brake",
    "baker",
    "arena",
    "arise",
    "actor",
    "bully",
    "brief",
    "black",
    "chair",
    "claim",
    "clock",
    "drive",
    "doing",
    "freed",
    "front",
    "green",
    "grand",
];

// get a random index
var index = Math.round( Math.random() * (words.length - 1) );

// get a random word
var word = words[index].toUpperCase();

console.log(word)

function keyboardClick(ev) {
    if (ev.target.nodeName!='TD') return;
    var key = ev.target.innerHTML;
    gotKey(key);
}

document.addEventListener('keydown', function(ev) {
    var key = ev.key.toUpperCase();
    if (key.length>1 && key!='ENTER' && key!='BACKSPACE') return;
    if (key<'A' || key>'Z') return;
    gotKey(key);
});

var rowMax=6;
var colMax=5;

var row = 0;
var col = 0;

function gotKey(key) {
    console.log('got key press: '+key);
    var table = document.getElementById('box');

// if its backspace 
    if (key=="BACKSPACE") {
        if (col==0) return;
        col=col-1;
        table.rows[row].cells[col].innerHTML = "";

    }
    else if (key=="ENTER") {
        if (col!=colMax) return;
        var result=check(table.rows[row]);
        if (!result) {
            row=row+1;
            col=0;
        }
    }
    else {
        if (col==colMax) return;
        // put letters a-z in the box
        table.rows[row].cells[col].innerHTML = key;
        col = col + 1;
    }
}

function check(row) {
    // get input word from table
    var input="";
    for(var i=0;i<row.cells.length;i++) {
        input=input+row.cells[i].innerHTML;
    }
    console.log(input)
    // first check if it's all correct
    
    // compare letters one by one, color green if match
    var word2=word.split('');
    var match=Array(colMax).fill('N');
    for(var i=0;i<colMax;i++) {
        if (input[i]==word[i]) {
            row.cells[i].className="green";
            match[i]="Y"
            word2[i]="-";
        }
    }
    // check for yellow conditions
    // find the letter not in the right position and doesn't have a match 
    for(var i=0;i<colMax;i++) {
        if (match[i]=="Y") continue;
        var j=word2.indexOf(input[i]);
        if (j<0) row.cells[i].className="grey";
        else {
            row.cells[i].className="yellow";
            word2[j]="-";
        }
    }


    if (input==word) {
        alert("CORRECT!");
        return true;
    }

 
}