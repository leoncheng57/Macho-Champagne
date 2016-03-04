/*
  Caitlin Stanton
  SoftDev pd 3
  HW 3 -- Are We Ever Going to Start the Movie?
  2016-02-22
*/

var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var clear = document.getElementById("clear");

var radius = 0;
var growing = true;
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var dvdButton = document.getElementById("dvd");
var clearButton = document.getElementById("clear");

var requestID;

//Starts the circle drawn, and makes it pulsate :D
var drawDot = function drawDot() {

    ctx.clearRect(0,0,c.width,c.height);  //clears canvas
    ctx.strokeRect(0,0,c.width,c.height);

    if (growing == true) {
		radius = radius + 1;
    } else {
		radius = radius - 1;
    }
    if (radius >= (c.width/2)) {
		growing = false;
    } else if (radius <= 0) {
		growing = true;
    }

    ctx.beginPath();
    ctx.arc(c.width/2, c.height/2, radius, 0, 2*Math.PI);
    ctx.stroke();
    ctx.fill();

    requestID = window.requestAnimationFrame(drawDot);
}

var img = document.getElementById("logo");
var x = 0;
var y = 0;
var xspeed = -5;
var yspeed = -5;
var dvdBounce = function dvdBounce() {
	clear();
	if (x <= 0 || x >= (c.width - 60)) {
		xspeed = -xspeed;
	} 
	if (y <= 0 || y >= (c.height - 40)) {
		yspeed = -yspeed;
	}
	x = x + xspeed;
	y = y + yspeed;
	ctx.drawImage(img,x,y,60,40);
	requestID = window.requestAnimationFrame(dvdBounce);
}


//Stops current animation
var stop = function stop() {
	window.cancelAnimationFrame(requestID);
	x = 0;
	y = 0;
	xspeed = -5;
	yspeed = -5;
}

//Clears entire canvas from previous animation
var clear = function clear() {
    ctx.clearRect(0,0,c.width,c.height); //clears canvas
	window.cancelAnimationFrame(requestID);
	radius = 0;
}

startButton.addEventListener("click", drawDot);
stopButton.addEventListener("click", stop);
clearButton.addEventListener("click",clear);
dvdButton.addEventListener("click", dvdBounce);