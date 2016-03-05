//TUTORIALS
//Keyboard: https://www.kirupa.com/html5/keyboard_events_in_javascript.htm

console.log("hello");

var c = document.getElementById("pad");
var ctx = c.getContext("2d");

var clearScreen = function(){
    ctx.clearRect(0, 0, c.width, c.height);
};

var drawRect = function(x, y){
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.fillStyle = "#ff6c24";
    ctx.rect(x, y, 20, 100);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
};

var x = 100;
var y = 100;

setInterval(function(){
    clearScreen();
    drawRect(x, y);
}, 0.001);

var keyboardActions = function keyboardActions(e){
    var k = e.keyCode;
    console.log(k);
    if (k==37){ //left 
	x-=10;
    }
    else if (k==38){ //up
	y-=10;
    }
    else if (k==39){ //right
	x+=10;
    }
    else if (k==40){ //down
	y+=10;
    }
}

window.addEventListener("keydown", keyboardActions);


console.log("gbye");
