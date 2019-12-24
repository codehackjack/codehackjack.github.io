/*Thinking
create bullet as a new asteroid object
on the event of the space bar, place it at the player object
apply force (velocity) to asteroid and allow it to fly in the direction player is facing
if there is a collsion with an asteroid..... Destroy both the asteroid and the bullet
allocate points depending on the raduis of the enemy asteroids(score = radius/2)
if the bullet flies off the screen, delete bullet
*/
$(document).ready(function() {
	var canvas = $("#gameCanvas");
	var context = canvas.get(0).getContext("2d");
	// Canvas dimensions
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	// Game settings
	var playGame;
	var asteroids;
	var numAsteroids;
	var player;
	var missile;
	var isMissileOnCanvas = false;
	var arrowUp = 38;
	var arrowRight = 39;
	var arrowDown = 40;
	var spaceBar = 32;
	var score;
	var time;
	var asteroidKills = 0;
	var scoreTimeout;
	// Game UI
	var ui = $("#gameUI");
	var uiIntro = $("#gameIntro");
	var uiStats = $("#gameStats");
	var uiComplete = $("#gameComplete");
	var uiPlay = $("#gamePlay");
	var uiReset = $(".gameReset");
	var uiScore = $(".gameScore");
	var soundMissile = $("#LaunchSound").get(0);
	var soundBackground = $("#gameSoundBackground").get(0);
	var soundThrust = $("#gameSoundThrust").get(0);
	var soundDeath = $("#gameSoundDeath").get(0);
	// Reset and start the game
	var Asteroid = function(x, y, radius, vX) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.vX = vX;

	};
	var Player = function(x, y) {
		this.x = x;
		this.y = y;
		this.width = 24;
		this.height = 24;
		this.halfWidth = this.width/2;
		this.halfHeight = this.height/2;
		this.vX = 0;
		this.vY = 0;
		this.moveRight = false;
		this.moveUp = false;
		this.moveDown = false;
		this.space = false;
		this.flameLength = 20;
	};
	//missle
	
	var Missile = function(x, y){
		this.visibleMissile = false;
		this.x = x;
		this.y = y;
		this.radius = 5;
		this.vX = 10;
  	}
  	
 
	function startGame() {
		// Reset game stats
		uiScore.html("0");
		uiStats.show();
		// Set up initial game settings
		playGame = false;
		asteroids = new Array();
		numAsteroids = 10;
		score = 0;
		time = 0;
		player = new Player(150, canvasHeight/2);
		missile = new Missile(player.x++, player.y);

		for (var i = 0; i < numAsteroids; i++) {
			var radius = 5+(Math.random()*10);
			var x = canvasWidth+radius+Math.floor(Math.random()*canvasWidth);
			var y = Math.floor(Math.random()*canvasHeight);
			var vX = -5-(Math.random()*5);
			asteroids.push(new Asteroid(x, y, radius, vX));
		};
		$(window).keydown(function(e) {
			var keyCode = e.keyCode;
			if (!playGame) {
				playGame = true;
				soundBackground.currentTime = 0;
				soundBackground.play();
				animate();
				timer();
			};
			if (keyCode == arrowRight) {
				player.moveRight = true;
			} else if (keyCode == arrowUp) {
				player.moveUp = true;
			} else if (keyCode == arrowDown) {
				player.moveDown = true;
			};
			if (keyCode == spaceBar){
				player.space = true;
			};
		});
		$(window).keyup(function(e) {
			var keyCode = e.keyCode;
			if (keyCode == arrowRight) {
				player.moveRight = false;
			} else if (keyCode == arrowUp) {
				player.moveUp = false;
			} else if (keyCode == arrowDown) {
				player.moveDown = false;
			};
			if (keyCode == spaceBar){
				player.space = false;
			};
			soundThrust.pause();
			if (soundThrust.paused) {
				soundThrust.currentTime = 0;
				soundThrust.play();
			};
		});
		// Start the animation loop
		animate();
	};

	// Inititialize the game environment
	function init() {
		uiStats.hide();
		uiComplete.hide();
			uiPlay.click(function(e) {
				e.preventDefault();
				uiIntro.hide();
				startGame();
			});
			uiReset.click(function(e) {
				e.preventDefault();
				uiComplete.hide();
				$(window).unbind("keyup");
				$(window).unbind("keydown");
				soundThrust.pause();
				soundBackground.pause();
				startGame();
			});
	};
// Animation loop that does all the fun stuff
	function timer() {
		if (playGame) {
			scoreTimeout = setTimeout(function() {
				uiScore.html(++score);
				++time;
				if (time % 5 == 0) {
					numAsteroids += 5;
				};
				timer();
			}, 1000);
		};
	};
	function animate() {
		// Clear
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		var asteroidsLength = asteroids.length;

		//asteroid loop
		for (var i = 0; i < asteroidsLength; i++) {
			var tmpAsteroid = asteroids[i];

			if (tmpAsteroid.x+tmpAsteroid.radius < 0) {
				tmpAsteroid.radius = 5+(Math.random()*10);
				tmpAsteroid.x = canvasWidth+tmpAsteroid.radius;
				tmpAsteroid.y = Math.floor(Math.random()*canvasHeight);
				tmpAsteroid.vX = -5-(Math.random()*5);
			};

			tmpAsteroid.x += tmpAsteroid.vX;

			var dX = player.x - tmpAsteroid.x;
			var dY = player.y - tmpAsteroid.y;
			var distance = Math.sqrt((dX*dX)+(dY*dY));

			var dXm = missile.x - tmpAsteroid.x;
			var dYm = missile.y - tmpAsteroid.y;
			var distanceM = Math.sqrt((dXm*dXm)+(dYm*dYm));
			// player death if statement
			if (distance < player.halfWidth+tmpAsteroid.radius) {
				soundThrust.pause();
				soundDeath.currentTime = 0;
				soundDeath.play();
				// Game over
				playGame = false;
				clearTimeout(scoreTimeout);
				uiStats.hide();
				uiComplete.show();
				soundBackground.pause();
				$(window).unbind("keyup");
				$(window).unbind("keydown");
			};
			//missile destruction if statement.
			var missileHit = false;

			if (missile.visibleMissile){
				if (distanceM < missile.radius+tmpAsteroid.radius ) {
					missileHit = true;
					soundDeath.currentTime = 0;
					soundDeath.play();
					score += Math.round(tmpAsteroid.radius / 2, 0);
					asteroidKills += 1;
					asteroids.splice(i,1);
					i = i - 1;
					asteroidsLength = asteroidsLength - 1;
					//tmpAsteroid.clearRect();
					missile.visibleMissile = false;

				} 
			};
			//asteroid draw
			if (missileHit == false){
				context.fillStyle = "rgb(255, 255, 255)";
				context.beginPath();
				context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI*2, true);
				context.closePath();
				context.fill();
			};

			//possible end of asteroid loop

			};//end of asteroid loop

			player.vX = 0;
			player.vY = 0;

			if (player.moveRight) {
				player.vX = 3;
			} else {
				player.vX = -3;
			};
			if (player.moveUp) {
				player.vY = -3;
			};
			if (player.moveDown) {
				player.vY = 3;
			};
			if (player.space){
				if(missile.visibleMissile == false){
					soundMissile.currentTime = 0;
					soundMissile.play();
					missile.x = player.x + 2;
					missile.y = player.y;
					missile.visibleMissile = true;
				};
			};
			if (player.moveRight) {
				context.save();
        		context.translate(player.x-player.halfWidth, player.y);
				if (player.flameLength == 20) {
					player.flameLength = 15;
				} else {
					player.flameLength = 20;
				};		
				context.fillStyle = "orange";
				context.beginPath();
				context.moveTo(0, -5);
				context.lineTo(-player.flameLength, 0);
				context.lineTo(0, 5);
				context.closePath();
				context.fill();
				context.restore();
			};	
			while (asteroids.length < numAsteroids) {
				var radius = 5+(Math.random()*10);
				var x = Math.floor(Math.random()*canvasWidth)+canvasWidth+radius;
				var y = Math.floor(Math.random()*canvasHeight);
				var vX = -5-(Math.random()*5);
				asteroids.push(new Asteroid(x, y, radius, vX));
			};

			player.x += player.vX;
			player.y += player.vY;
			//bounds checks
			if (player.x < 50){
				player.x = 50;
			};
			if (player.x > 750){
				player.x = 750;
			};
			if (player.y < 20){
				player.y = 20;
			};
			if (player.y > 580){
				player.y = 580;
			};
			context.fillStyle = "rgb(255, 0, 0)";
			context.beginPath();
			context.moveTo(player.x+player.halfWidth, player.y);
			context.lineTo(player.x-player.halfWidth, player.y-player.halfHeight);
			context.lineTo(player.x-player.halfWidth, player.y+player.halfHeight);
			context.closePath();
			context.fill();


			//if missle is shot, draw it out
			if (missile.x > 800){
				missile.visibleMissile = false;
			} 

			if(missile.visibleMissile){
				missile.x += missile.vX;
				//drawing the missile + moving the missile
				context.fillStyle = "rgb(255, 90, 0)";
				context.beginPath();
				context.arc(missile.x, missile.y, missile.radius, 0, Math.PI*2, true);
				context.closePath();
				context.fill();

			}

		
		if (playGame) {
			// Run the animation loop again in 33 milliseconds
			setTimeout(animate, 33);
		};
	};
init();
});