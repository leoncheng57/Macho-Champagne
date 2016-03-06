/* TUTORIALS */
/* ========= */
//Keyboard: https://www.kirupa.com/html5/keyboard_events_in_javascript.htm

console.log("hello");

var c = document.getElementById("pad");
var ctx = c.getContext("2d");

var clearScreen = function(){
    ctx.clearRect(0, 0, c.width, c.height);
};

//initial x and y coors of the rect/paddle
var x1 = 50;
var y1 = 100;
var x2 = 520;
var y2 = 100;
var pwidth = 20;
var pheight = 100;
var requestId;

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

// keys, keysPressed, keysReleased are used for keyboard actions
var keys = [];

function keysPressed(e){
    keys[e.keyCode] = true;
    if (keys[38]){ //up
	y2-=15;
    }
    if (keys[40]){ //down
	y2+=15;
    }
    if (keys[87]){ //w
	y1-=15;
    }
    if (keys[83]){ //s
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

//CODE FOR LOGO

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
	ly += 2;
    else
	ly -= 2;
    //Move in horizontal directoin
    if (goingRight)
	lx += 2;
    else
	lx -= 2;
    //Change the direction when it hits the wall
    if (ly <= 0 || ly >= c.height-lheight)
	goingUp = !goingUp;
    if (lx <= 0 || lx >= c.width-lwidth)
	goingRight = !goingRight;
    //Change the direction when it hits the paddles
    if( lx-10 > x1 && lx-10 < x1+pwidth && ly > y1 && ly < y1+pheight )
	goingRight = !goingRight;
    if( lx+10 > x2 && lx+10 < x2+pwidth && ly > y2 && ly < y2+pheight ) //note: the +10 is to detect the right side of the ball
	goingRight = !goingRight;
    //Draw the image
    drawBall(lx, ly);
}

//Method to call constantly
function run(){
    window.cancelAnimationFrame(requestId);
    clearScreen();
    drawPaddle(x1, y1); //first paddle
    drawPaddle(x2, y2); //second paddle
    moveBall();
    //Repeatedly draw the rect/paddle
    requestId = window.requestAnimationFrame(run);
};
run();


console.log("gbye");
