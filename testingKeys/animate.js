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
var x = 50;
var y = 100;
var width = 20;
var height = 100;

var drawRect = function(x, y){
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.fillStyle = "#ff6c24";
    ctx.rect(x, y, width, height);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
};

//Change the x, y coors depending on the arrow key pressed
var keyboardActions = function keyboardActions(e){
    var k = e.keyCode;
    if (k==37){ //left 
	x-=15;
    }
    else if (k==38){ //up
	y-=15;
    }
    else if (k==39){ //right
	x+=15;
    }
    else if (k==40){ //down
	y+=15;
    }
}

//Event listener for key presses
window.addEventListener("keydown", keyboardActions);

//Repeatedly draw the rect/paddle
setInterval(function(){
    clearScreen();
    drawRect(x, y);
    //Print out the surface that will be in contact
    console.log("paddle surface: ("+ (x+width) + ", " + y + ") to (" + (x+width) + ", " + (y+height) + ")");
}, 0);


console.log("gbye");
