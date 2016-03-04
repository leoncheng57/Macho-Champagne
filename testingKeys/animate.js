console.log("hello");

// function myFunction(event) {
//     var x = event.which;
// }
// http://www.w3schools.com/jsref/event_key_which.asp
// https://www.google.com/search?q=leyboar+djavascript&oq=leyboar+djavascript&aqs=chrome..69i57j0l5.2326j0j4&client=ubuntu&sourceid=chrome&es_sm=93&ie=UTF-8



var c = document.getElementById("pad");
var ctx = c.getContext("2d");


ctx.clearRect(0, 0, c.width, c.height);
ctx.beginPath();
ctx.fillStyle = "#ff6c24";
ctx.rect(123, 213, 123, 12);
ctx.stroke();
ctx.fill();
ctx.closePath();




console.log("gbye");
