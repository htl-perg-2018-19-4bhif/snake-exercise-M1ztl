
var ansi = require('ansi');
var keypress = require('keypress');
var cursor = ansi(process.stdout);
var cursnakeX = 10;
var cursnakeY = 10;
var prevSnakeX = 10;
var prevSnakeY = 10;
var appleX = 5;
var appleY = 5;

process.stdout.write('\x1Bc');
process.stdout.write('\x1B[?25l');

process.stdin.setRawMode(true);
process.stdin.resume();

cursor.bg.grey();
drawArea(1, 1, 20, 30);
cursor.bg.reset();

setSnake();
setApple();

keypress(process.stdin);
process.stdin.on('keypress', getKey);

function drawArea(col, row, length, width) {
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < width; j++) {
            cursor.goto(col + j, row + i).write(" ");
        }
    }
}

function setSnake() {
    drawSnake(cursnakeX, cursnakeY);
}

function setApple() {
    drawApple(appleX, appleY);
}

function hitApple() {
    if (cursnakeX == appleX && cursnakeY == appleY) {
        setRandomApple();
    }
}

function hitBorder() {
    if (cursnakeX <= 1 || cursnakeX >= 30 || cursnakeY <=1 || cursnakeY >=20){
        gameOver();
    }    
}

function setRandomApple() {
    appleX = Math.random() * (21 - 1) - 1;
    appleY = Math.random() * (21 - 1) - 1;
    drawApple(appleX, appleY);
}


function drawApple(x, y) {
    cursor.bg.red();
    cursor.goto(x, y).write(" ")
    cursor.bg.reset();
}

function drawSnake(x, y) {
    cursor.bg.green();
    cursor.goto(x, y).write(" ")
    cursor.bg.reset();
}

function moveSnake(x, y) {
    cursor.bg.grey();
    cursor.goto(prevSnakeX, prevSnakeY).write(" ")
    cursor.bg.reset();
    drawSnake(cursnakeX, cursnakeY);
    hitApple();
    hitBorder();

    prevSnakeX = cursnakeX;
    prevSnakeY = cursnakeY;
}

function getKey(ch, key) {
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
        process.exit();
    } else if (key.name == "up") {
        cursnakeY -= 1;
        moveSnake(cursnakeX, cursnakeY);
    } else if (key.name == "down") {
        cursnakeY += 1;
        moveSnake(cursnakeX, cursnakeY);
    } else if (key.name == "right") {
        cursnakeX += 1;
        moveSnake(cursnakeX, cursnakeY);
    } else if (key.name == "left") {
        cursnakeX -= 1;
        moveSnake(cursnakeX, cursnakeY);
    }
}

function gameOver(){
    cursor.bg.red();
    cursor.goto(10,10).write("GAME OVER")
    cursor.reset();
    process.exit();
}


