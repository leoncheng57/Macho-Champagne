/*
  Caitlin Stanton
  SoftDev pd 3
  HW 3 -- Are We Ever Going to Start the Movie?
  2016-02-22
*/

var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var beginButton = document.getElementById("begin");
var clearButton = document.getElementById("clear");

var requestID;

var x = 0;
var y = 0;
var xspeed = -5;
var yspeed = -5;
var beginBounce = function beginBounce() {
	clear();
	if (x <= 0 || x >= (c.width - 60)) {
		xspeed = -xspeed;
	} 
	if (y <= 0 || y >= (c.height - 40)) {
		yspeed = -yspeed;
	}
	x = x + xspeed;
	y = y + yspeed;
	ctx.arc(x,y,50,0,2*Math.PI);
	ctx.stroke();
    //ctx.fill();
	requestID = window.requestAnimationFrame(beginBounce);
}

//Clears entire canvas from previous animation
var clear = function clear() {
    ctx.clearRect(0,0,c.width,c.height); //clears canvas
	window.cancelAnimationFrame(requestID);
}

clearButton.addEventListener("click",clear);
beginButton.addEventListener("click", beginBounce);