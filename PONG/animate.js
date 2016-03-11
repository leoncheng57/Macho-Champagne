/* TUTORIALS */
/* ========= */
//Keyboard: https://www.kirupa.com/html5/keyboard_events_in_javascript.htm

console.log("hello");

var c = document.getElementById("pad");
var ctx = c.getContext("2d");

var clearScreen = function(){
    ctx.clearRect(0, 0, c.width, c.height);
};

//lots of variables
var x1 = 50;
var y1 = 100;
var x2 = 520;
var y2 = 100;
var pwidth = 20;
var pheight = 100;
var requestId;
var p1score = 0;
var p2score = 0;
var speed = 3;
var iradius = 7; //radius of an item
items = []; //to store powerups, items

/* DRAWING ON THE CANVAS */
var drawPaddle = function(x, y){
    ctx.beginPath();
    ctx.fillStyle = "#ff6c24";
    ctx.rect(x, y, pwidth, pheight);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
};

var drawBall = function(x, y){
    ctx.beginPath();
    ctx.fillStyle = "#ff6c24";
    ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
};

var drawItem = function(x, y){
    ctx.beginPath();
    ctx.fillStyle = "#2172ea";
    ctx.arc(x, y, iradius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
};

/* KEYBOARD ACTIONS */
var keys = [];

function keysPressed(e){
    keys[e.keyCode] = true;
    if (keys[79] && y2 > 5){ //o
	y2-=15;
    }
    if (keys[76] && y2 < 300){ //l
	y2+=15;
    }
    if (keys[87] && y1 > 5){ //w
	y1-=15;
    }
    if (keys[83] && y1 < 300){ //s
	y1+=15;
    }
    //e.preventDefault();
}

function keysReleased(e){
    keys[e.keyCode] = false;
}

//Event Listeners for key pressing
window.addEventListener("keydown", keysPressed);
window.addEventListener("keyup", keysReleased);


/* BALL MOVEMENT */
//Booleans to keep track of direction of movement
var goingUp = false;
var goingRight = true;
//height and width
var lheight = 20;
var lwidth = 20;
//X and Y Coors of the Logo
var lx = c.width/2 - lwidth/2;
var ly = c.height/2 - lheight/2;

function moveBall(){
    //Move in vertical direction
    if (goingUp)
	ly += speed;
    else
	ly -= speed;
    //Move in horizontal direction
    if (goingRight)
	lx += speed;
    else
	lx -= speed;
    //Change the direction when it hits the wall
    if (ly >= c.height)
	goingUp = !goingUp;
    if (lx >= c.width+lwidth)
	goingRight = !goingRight;
    if (ly <= 0)
	goingUp = !goingUp;
    if (lx <= 0)
	goingRight = !goingRight;
    //Change the direction when it hits the paddles
    if( lx-10 > x1 && lx-10 < x1+pwidth && ly > y1 && ly < y1+pheight )
	goingRight = !goingRight;
    if( lx+10 > x2 && lx+10 < x2+pwidth && ly > y2 && ly < y2+pheight ) //note: the +10 is to detect the right side of the ball
	goingRight = !goingRight;
}

var pauseOrNah = 0;

/* SCORE */
function score(){
    if (lx < 10){
        p2score += 1;
        lx = 80;
        ly = y1 + 50;
        drawBall(lx, ly);
        pauseOrNah = 1;

    }
    if (lx > c.width - 5){
        p1score += 1;
        lx = 510;
        ly = y2 + 50;
        drawBall(lx, ly);
        pauseOrNah = 1;

    }
    document.getElementById("p1score").innerHTML = "Player 1 score: " + p1score;
    document.getElementById("p2score").innerHTML = "Player 2 score: " + p2score;
}

/* Stops Game for given amount of milliseconds */
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

/* ITEMS */
function genItems(){
    var r = Math.floor((Math.random() * 50));
    if (r==0){
	var coors = [];
	coors[0] = Math.floor((Math.random()*600));
	coors[1] = Math.floor((Math.random()*400));
	items[items.length] = coors;
    };
};

function drawAllItems(){
    var i;
    for (i = 0; i<items.length; i++){
	drawItem(items[i][0], items[i][1]);
    }
}

function itemCollision(){
    for (i = 0; i<items.length; i++){
	x = items[i][0];
	y = items[i][1];
	var r = iradius;
	//x-r, x+r
	//y-r, y+r
	//*TODO*: FINISH THIS
    }
}

/* RUN */
//Method to call constantly
function run(){
    if (pauseOrNah == 1){
        sleep(1000);
    }
    pauseOrNah = 0;
    clearScreen();
    drawPaddle(x1, y1); //first paddle
    drawPaddle(x2, y2); //second paddle
    moveBall();
    drawBall(lx, ly);
    genItems();
    drawAllItems();
    score();

    /* for redrawing ball after score*/
    clearScreen();
    drawPaddle(x1, y1); //first paddle
    drawPaddle(x2, y2); //second paddle
    drawBall(lx, ly);
    genItems();
    drawAllItems();
    /*---------*/

    requestId = window.requestAnimationFrame(run); //Repeatedly draw the rect/paddle
};

function pause(){
    window.cancelAnimationFrame(requestId);
};

function setup() {
    window.cancelAnimationFrame(requestId);
    p1score = 0;
    p2score = 0;
    clearScreen();
    drawPaddle(x1, y1); //first paddle
    drawPaddle(x2, y2); //second paddle
    lx = c.width/2 - lwidth/2;
    ly = c.height/2 - lheight/2;
    drawBall(lx, ly);
}

document.onload = setup();
var startButton = document.getElementById("start");
startButton.addEventListener("click",run); //initiates everything!
var pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", pause);
var restartButton = document.getElementById("restart");
restartButton.addEventListener("click",setup);


/* CHANGING SPEED */
function speedup(){
    speed ++;
}

function speeddown(){
    speed --;
}

var speedUp = document.getElementById("speedup");
var speedDown = document.getElementById("speeddown");
speedUp.addEventListener("click", speedup);
speedDown.addEventListener("click", speeddown);

console.log("gbye");
