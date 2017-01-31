var canvas = document.getElementById("canvas");
var cHeight = canvas.height;
var cWidth = canvas.width;
var snake = canvas.getContext('2d');
var food = canvas.getContext('2d');
var directionX = 0;
var directionY = 0;
var snakeLength = 0;
var GameOver = false;
var direction = " ";
var score = 0;
var speed = 10;
var foodLoc = {
	x: 0,
	y: 0
};
var foodPresent = false;
var keyDown = [];
var obj = [{
	x: 0,
	y: 0,
	bx: 0,
	by: 0
}];
window.addEventListener("keydown", function(e) {
	keyDown[e.keyCode] = true;
});
window.addEventListener("keyup", function(e) {
	keyDown[e.keyCode] = false;
});
(function update() {
	//key presses
	if (keyDown[87]) {
		directionX = 0;
		directionY = -speed;
		direction = "up";
	}
	if (keyDown[65]) {
		directionY = 0;
		directionX = -speed;
		direction = "left";

	}
	if (keyDown[83]) {
		directionY = speed;
		directionX = 0;
		direction = "down";

	}
	if (keyDown[68]) {
		directionY = 0;
		directionX = speed;
		direction = "right";

	}
	//food
	if (!foodPresent) {
		foodLoc.x = Math.floor((Math.random() * (cWidth - 50)) + 1);
		foodLoc.y = Math.floor((Math.random() * (cHeight - 50)) + 1);
		foodPresent = true;
	}
	food.fillStyle = '#76ACDE';
	food.fillRect(foodLoc.x, foodLoc.y, 20, 20);
	//food collision
	if ((obj[0].x > foodLoc.x && obj[0].x < foodLoc.x + 20) || (obj[0].x + 10 > foodLoc.x && obj[0].x + 10 < foodLoc.x + 20)) {
		if ((obj[0].y > foodLoc.y && obj[0].y < foodLoc.y + 20) || (obj[0].y + 10 > foodLoc.y && obj[0].y + 10 < foodLoc.y + 20)) {
			score += 10;
			foodPresent = false;
			food.clearRect(foodLoc.x, foodLoc.y, 20, 20);
			obj.push({
				x: 0,
				y: 0,
				bx: 0,
				by: 0
			});
		}
	}

	//movement
	snake.fillStyle = '#C85959';
	for (var i = 0; i < obj.length; i++) {
		obj[i].bx = obj[i].x;
		obj[i].by = obj[i].y;
		if (i > 0) {
			obj[i].x = obj[i - 1].bx;
			obj[i].y = obj[i - 1].by;
		} else {
			obj[0].x += directionX;
			obj[0].y += directionY;
			if (obj[0].x + 10 <= 0) obj[0].x = cWidth + 1;
			else if (obj[0].x >= cWidth) obj[0].x = -9;
			else if (obj[0].y >= cHeight) obj[0].y = -9;
			else if (obj[0].y + 10 <= 0) obj[0].y = cHeight + 1;
		}
		snake.clearRect(obj[i].bx, obj[i].by, 10, 10);
		snake.fillRect(obj[i].x, obj[i].y, 10, 10);
	}

	//snake cannibalism detection
	for (var i = 1; i < obj.length; i++) {
		if (direction == "up") {
			if ((obj[0].x >= obj[i].x && obj[0].x <= obj[i].x + 10) || (obj[0].x + 10 >= obj[i].x && obj[0].x + 10 <= obj[i].x + 10)) {
				if (obj[0].y >= obj[i].y && obj[0].y <= obj[i].y + 10) {
					GameOver = true;
				}
			}
		}
		if (direction == "down") {
			if ((obj[0].x >= obj[i].x && obj[0].x <= obj[i].x + 10) || (obj[0].x + 10 >= obj[i].x && obj[0].x + 10 <= obj[i].x + 10)) {
				if (obj[0].y + 10 >= obj[i].y && obj[0].y + 10 <= obj[i].y + 10) {
					GameOver = true;
				}
			}
		}
		if (direction == "left") {
			if ((obj[0].y >= obj[i].y && obj[0].y <= obj[i].y + 10) || (obj[0].y + 10 >= obj[i].y && obj[0].y + 10 <= obj[i].y + 10)) {
				if (obj[0].x >= obj[i].x && obj[0].x <= obj[i].x + 10) {
					GameOver = true;
				}
			}
		}
		if (direction == "right") {
			if ((obj[0].y >= obj[i].y && obj[0].y <= obj[i].y + 10) || (obj[0].y + 10 >= obj[i].y && obj[0].y + 10 <= obj[i].y + 10)) {
				if (obj[0].x + 10 >= obj[i].x && obj[0].x + 10 <= obj[i].x + 10) {
					GameOver = true;
				}
			}
		}
	}
	document.getElementById("score").innerHTML = score;
	if (!GameOver) window.requestAnimationFrame(update);
})();
