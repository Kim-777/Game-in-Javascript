import BLOCKS from './blocks.js';

// DOM을 선택합니다.
const playground = document.querySelector('.playground > ul');


// 게임에 필요한 고정 값을 선언합니다.
const GAME_ROWS = 20;
const GAME_COLS = 10;
const FIRST_RANDOM = Math.random()
// 게임에 사용되는 변수들입니다.
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;


const movingItem = {
    type: typeMaker(),
    direction: 0,
    top: 0,
    left: 0,
};

init();

function init() {

    // blockArray.forEach(block => {
    //     console.log(block[0]);
    // })
    tempMovingItem = {...movingItem};
    for(let i=0; i<GAME_ROWS; i++) {
        prependNewLine();
    }

    renderBlocks();
}

function typeMaker() {
    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length);
    return blockArray[randomIndex][0];
}

function prependNewLine() {
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    for(let j=0; j<GAME_COLS; j++) {
        const matrix = document.createElement('li');
        ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
}

function renderBlocks(moveType="") {
    const { type, direction, top, left} = tempMovingItem;
    const movingBlocks = document.querySelectorAll('.moving');
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    })

    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        console.log({playground});
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null ;
        const isAvailable = checkEmpty(target);
        if(isAvailable) {
            target.classList.add(type, "moving")
        } else {
            tempMovingItem = {...movingItem}
            setTimeout(() => {
                renderBlocks();
                if(moveType === "top") {
                    seizeBlock()
                }
            }, 0);
            return true;
        }
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction =direction;
}

function seizeBlock() {
    const movingBlocks = document.querySelectorAll('.moving');
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add('seized');
    });
    generateNewBlock();
}

function generateNewBlock() {
    
    movingItem.type = typeMaker();
    console.log(movingItem.type);
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = {...movingItem};
    renderBlocks();
}

function checkEmpty(target) {
    if(!target || target.classList.contains('seized')) {
        return false;
    }
    return true;
}

function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType);
}

function chageDirection() {
    tempMovingItem.direction += 1;
    if(tempMovingItem.direction === 4) {
        tempMovingItem.direction = 0;
    }
    renderBlocks();
}

// event handling
document.addEventListener('keydown', e => {
    switch(e.keyCode) {
        case 39:
            moveBlock("left", 1);
            break;
        case 37 :
            moveBlock('left', -1);
            break;
        case 38:
            chageDirection();
            break;
        case 40:
            moveBlock('top', 1);
            break;
        default: 
            break;
    }
    console.log(e);
})