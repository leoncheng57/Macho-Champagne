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
var width = 20;
var height = 100;
var requestId;

var drawRect = function(x, y){
    ctx.beginPath();
    ctx.fillStyle = "#ff6c24";
    ctx.rect(x, y, width, height);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
};

// keys, keysPressed, keysReleased are used for keyboard actions
var keys = [];

function keysPressed(e){
    keys[e.keyCode] = true;
    if (keys[38]){ //up
	y1-=15;
    }
    if (keys[40]){ //down
	y1+=15;
    }
    if (keys[87]){ //w
	y2-=15;
    }
    if (keys[83]){ //s
	y2+=15;
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

function drawBall(){
    window.cancelAnimationFrame(requestId);
    //Move in vertical direction
    if (goingUp)
	ly += 1;
    else
	ly -= 1;
    //Move in horizontal directoin
    if (goingRight)
	lx += 1;
    else
	lx -= 1;
    //Change the direction when it hits the wall
    if (lx <= 0 || lx >= c.width-lwidth)
	goingRight = !goingRight;
    if(ly <= 0 || ly >= c.height-lheight)
	goingUp = !goingUp;
    //Draw the image
    drawRect(lx, ly);
    //Periodically call the function
    window.requestAnimationFrame(drawBall);
}
drawBall();

//Method to call constantly
function run(){
    clearScreen();
    drawBall();
    drawRect(x1, y1); //first paddle
    drawRect(x2, y2); //second paddle
    //Print out the surface that will be in contact
    console.log("paddle surface: ("+ (x1+width) + ", " + y1 + ") to (" + (x1+width) + ", " + (y1+height) + ")");
    //Repeatedly draw the rect/paddle
    requestId = window.requestAnimationFrame(run);
};
run();


console.log("gbye");
