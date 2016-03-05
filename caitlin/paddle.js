var keysDown = {};

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});

Player1.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 87) { // left arrow
      this.paddle.move(0, -4);
    } else if (value == 83) { // right arrow
      this.paddle.move(0, 4);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

Player2.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 76) { // left arrow
      this.paddle.move(0, -4);
    } else if (value == 80) { // right arrow
      this.paddle.move(0, 4);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.y < 0) { // all the way to the left
    this.y = 0;
    this.y_speed = 0;
  } else if (this.y + this.height > 400) { // all the way to the right
    this.y = 400 - this.height;
    this.y_speed = 0;
  }
}