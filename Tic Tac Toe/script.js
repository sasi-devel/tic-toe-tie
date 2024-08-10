const boxes = document.querySelectorAll(".box");
const play = document.querySelector(".play");
const btnstart = document.querySelector(".btnstart");

let x="X"
let o="O"

const win = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];

let options = ["","","","","","","","",""];
let currentplayer = x;
let player = 'X';
let running = false;
init();
function init(){
    boxes.forEach(box=>box.addEventListener('click',boxClick));
    running=true;
    btnstart.addEventListener('click',restartGame);
    play.textContent=`${player}=> Your Turn`;
};

function boxClick(){
    let index = this.dataset.index;
    if(options[index]!="" || !running){
        return;
    };
    updateBox(this,index);
};

function updateBox(box,index){
    options[index]=player;
    box.innerHTML=currentplayer;
    checkWinner();
};

function changePlayer(){
    player=(player=='X') ? 'O': 'X';
    currentplayer=(currentplayer==x) ? o: x;
    play.textContent=`${player}=> Your Turn`;
};

function checkWinner(){
    let isWon = false;
    for(let i=0;i<win.length;i++){
        const condition = win[i];
        let box1 = options[condition[0]];
        let box2 = options[condition[1]];
        let box3 = options[condition[2]];
        if(box1=="" || box2=="" || box3==""){
            continue;
        }
        if(box1==box2 && box2==box3){
            isWon=true;
            boxes[condition[0]].classList.add('win');
            boxes[condition[1]].classList.add('win');
            boxes[condition[2]].classList.add('win');
        }
    }
    if(isWon){
        play.textContent=`${player} Won the Match`;
        running=false;
    }else if(!options.includes("")){
        play.textContent=`Game Draw..!`;
        
        boxes.forEach(box=>{
            box.classList.add('win');
        });
        running=false;
    }else{
        changePlayer();
    }
};

function restartGame(){
    options = ["","","","","","","","",""];
    currentplayer = x;
    player = 'X';
    running = true;
    play.textContent=`${player}=> Your Turn`;

    boxes.forEach(box=>{
        box.innerHTML="";
        box.classList.remove('win');
    })
};


