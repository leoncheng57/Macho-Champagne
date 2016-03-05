console.log("hello");

// function myFunction(event) {
//     var x = event.which;
// }
// http://www.w3schools.com/jsref/event_key_which.asp
// https://www.google.com/search?q=leyboar+djavascript&oq=leyboar+djavascript&aqs=chrome..69i57j0l5.2326j0j4&client=ubuntu&sourceid=chrome&es_sm=93&ie=UTF-8



var c = document.getElementById("pad");
var ctx = c.getContext("2d");

var clear = function(){
    ctx.clearRect(0, 0, c.width, c.height);
};

var drawRect = function drawRect(x, y){
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.fillStyle = "#ff6c24";
    ctx.rect(x, y, 123, 12);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
};

setInterval(function(){
    drawRect(100, 100);
}, 500);

var keyboardActions = function keyboardActions(e){
    var k = e.keycode;
    console.log(k);
    if (k==37){ //left 
	
    }
    else if (k==38){ //up

    }
    else if (k==39){ //right

    }
    else if (k==40){ //down

    }
}

window.addEventListener("keydown", keyboardActions);


console.log("gbye");
