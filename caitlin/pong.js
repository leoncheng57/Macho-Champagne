var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.createElement('canvas');
var width = 600;
var height = 400;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

var score1 = document.createElement('div');
score1.setAttribute("id","score1");
//document.querySelector("#score1").innerHTML = "Player 1: ";
var score2 = document.createElement('div');
score2.setAttribute("id","score2");
//document.querySelector("#score2").innerHTML = "Player 2: ";

var player1Score = 0;
var player2Score = 0;

window.onload = function() {
  document.body.appendChild(canvas);
  document.body.appendChild(score1);
  document.body.appendChild(score2);
  animate(step);
};

var step = function() {
  update();
  render();
  animate(step);
};

var render = function() {
  context.fillStyle = "#FF00FF";
  context.fillRect(0, 0, width, height);
};

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Paddle.prototype.render = function() {
  context.fillStyle = "#0000FF";
  context.fillRect(this.x, this.y, this.width, this.height);
};

function Player1() {
   this.paddle = new Paddle(10, 175, 10, 50);
}

function Player2() {
  this.paddle = new Paddle(580, 175, 10, 50);
}

Player1.prototype.render = function() {
  this.paddle.render();
};

Player2.prototype.render = function() {
  this.paddle.render();
};

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 3;
  this.y_speed = 0;
  this.radius = 5;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#000000";
  context.fill();
};

var player1 = new Player1();
var player2 = new Player2();
var ball = new Ball(200, 300);

var render = function() {
  context.fillStyle = "#FF00FF";
  context.fillRect(0, 0, width, height);
  player1.render();
  player2.render();
  ball.render();
};

var update = function() {
  ball.update(player1.paddle, player2.paddle);
};

Ball.prototype.update = function() {
  this.x += this.x_speed;
  this.y += this.y_speed;
};

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(this.x - 5 < 0) { // hitting the left wall
    this.x = 5;
    this.x_speed = -this.x_speed;
    player1Score++;
    score('#score1',player1Score);
  } else if(this.x + 5 > 600) { // hitting the right wall
    this.x = 595;
    this.x_speed = -this.x_speed;
    player2Score++;
    score('#score2',player2Score);
  }

  if(this.y < 0 || this.y > 600) { // a point was scored
    this.x_speed = 0;
    this.y_speed = 3;
    this.x = 300;
    this.y = 200;
  }

  if(top_y > 300) {
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      // hit the player's paddle
      this.y_speed = -3;
      this.x_speed += (paddle1.x_speed / 2);
      this.y += this.y_speed;
    }
  } else {
    if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
      // hit the computer's paddle
      this.y_speed = 3;
      this.x_speed += (paddle2.x_speed / 2);
      this.y += this.y_speed;
    }
  }
};

var score = function(player,score) {
	var name;
	if (player = '#score1') {
		name = "Player 1: ";
	}
	if (player = '#score2'){
		name = "Player 2: ";
	}
	document.querySelector(player).innerHTML = name + score;
};