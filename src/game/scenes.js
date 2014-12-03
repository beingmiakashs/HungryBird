game.module('game.scenes').require('engine.scene', 'engine.keyboard').body(function() {

	SceneGame = game.Scene.extend({
		backgroundColor : 0xb2dcef,
		gapTime : 4,
		gapTimeFruit : 1,
		gapTimeEnemy : 2,
		gapTimeGameLife : 0.5,
		gravity : 2000,
		score : 0,
		highScore : 0,
		cloudSpeedFactor : 1,
		collideType : 0,
		totalLife : 10,
		maxLife : 100,
		enemyCollide : -5,
		fruitCollide : 5,
		timeLifeDe : -1,

		gapSpeed : -300,
		eachGapSpeedUpdate : 0.5,
		gapFruitSpeed : -300,
		eachGapFruitSpeed : -0.5,
		gapEnemySpeed : -300,
		eachGapEnemySpeed : -0.5,

		gameStart : false,

		init : function() {
			this.world = new game.World(0, this.gravity);

			this.addParallax(0, 'media/parallax1.png', -50);
			this.addParallax(0, 'media/parallax3.png', -100);
			this.addParallax(0, 'media/parallax2.png', -200);

			this.logo = new Logo();

			this.addParallax(0, 'media/bushes.png', -250);
			this.gapContainer = new game.Container();
			this.stage.addChild(this.gapContainer);
			this.addParallax(800, 'media/ground.png', -300);

			this.player = new Player();

			var groundBody = new game.Body({
				position : {
					x : game.system.width / 2,
					y : 850
				}
			});
			var groundShape = new game.Rectangle(game.system.width, 100);
			groundBody.addShape(groundShape);
			this.world.addBody(groundBody);

			this.scoreText = new game.BitmapText(this.score.toString(), {
				font : 'Pixel'
			});
			this.scoreText.position.x = game.system.width / 2 - this.scoreText.textWidth / 2 + 30;
			this.scoreText.position.y = game.system.height - 1010;
			this.stage.addChild(this.scoreText);

			var text = new game.Sprite(game.system.width / 2, game.system.height - 48, 'media/madewithpanda.png', {
				anchor : {
					x : 0.5,
					y : 0
				}
			});
			this.stage.addChild(text);
			/*
			 var textUse = new game.Sprite(game.system.width / 2, game.system.height - 48, 'media/use.png', {
			 anchor: {x:0.5, y:0}
			 });
			 this.stage.addChild(textUse);
			 */

			game.system.stage.addChild(new game.Sprite(20, 12, 'media/life_bar_back.png'));

			this.lifeBar = new game.Graphics();
			this.lifeBar.beginFill(0x73C24E);
			this.lifeBar.drawRect(0, 0, 200, 40);
			this.lifeBar.position.x = (106);
			this.lifeBar.position.y = (30);
			this.lifeBar.scale.x = this.totalLife / 100;
			game.system.stage.addChild(this.lifeBar);

			game.system.stage.addChild(new game.Sprite(20, 12, 'media/life_bar_front.png'));

			this.playButton = new game.Sprite(game.system.width / 2, game.system.height / 2 + 180, 'media/play.png', {
				anchor : {
					x : 0.5,
					y : 0.5
				},
				scale : {
					x : 0,
					y : 0
				},
				interactive : true,
				mousedown : function() {
					game.scene.gameStart = true;
					game.analytics.event('play');
					game.scene.player.body.mass = 1;
					game.scene.logo.remove();

					game.scene.addTimer(game.scene.gapTime, game.scene.spawnGap.bind(game.scene), true);
					game.scene.addTimer(game.scene.gapTimeFruit, game.scene.spawnGapFruit.bind(game.scene), true);
					game.scene.addTimer(game.scene.gapTimeEnemy, game.scene.spawnGapEnemy.bind(game.scene), true);

					if (game.scene.gapTimeGameLife > 0)
						game.scene.addTimer(game.scene.gapTimeGameLife, game.scene.spawnGapGameLife.bind(game.scene), true);
					game.scene.playButton.remove();
				}
			});
			this.addTween(this.playButton.scale, {
				x : 1,
				y : 1
			}, 0.2, {
				easing : game.Tween.Easing.Back.Out
			}).start();
			game.system.stage.addChild(this.playButton);

			game.sound.musicVolume = 0.2;
			game.sound.playMusic('music');
		},

		spawnGap : function() {
			this.addObject(new Gap());
		},

		spawnGapFruit : function() {
			this.addObject(new GapFruit());
		},

		spawnGapEnemy : function() {
			this.addObject(new GapEnemy());
		},

		spawnGapGameLife : function() {

			this.gapSpeed -= this.eachGapSpeedUpdate;
			//this.gapSpeed -= 100;
			//this.gapFruitSpeed -= this.eachGapFruitSpeedUpdate;
			//this.gapEnemySpeed -= this.eachGapEnemySpeedUpdate;

			this.totalLife += this.timeLifeDe;
			this.lifeBar.scale.x = this.totalLife / 100;

			if (this.totalLife <= 0) {
				this.gapTimeGameLife = 0;
				game.scene.gameOver();
				this.player.body.velocity.y = -200;
				this.player.smokeEmitter.rate = 0;
				this.player.body.collisionGroup = 0;
			}
		},

		addScore : function(num) {
			if (num < 0) {
				this.totalLife += this.enemyCollide;
			} else {
				this.totalLife += this.fruitCollide;
			}
			this.totalLife = Math.min(this.totalLife, this.maxLife);
			this.lifeBar.scale.x = this.totalLife / 100;

			this.score += num;
			if (this.score < 0)
				this.score = 0;
			this.scoreText.setText(this.score.toString());
			game.sound.playSound('score');
		},

		addCloud : function(x, y, path, speed) {
			var cloud = new Cloud(x, y, path, {
				speed : speed
			});
			this.addObject(cloud);
			this.stage.addChild(cloud);
		},

		addParallax : function(y, path, speed) {
			var parallax = new game.TilingSprite(0, y, path);
			parallax.speed.x = speed;
			this.addObject(parallax);
			this.stage.addChild(parallax);
		},

		mousedown : function() {
			if (this.ended)
				return;
			if (this.gameStart == false)
				return;
			if (this.player.body.mass === 0) {
				game.analytics.event('play');
				this.player.body.mass = 1;
				this.logo.remove();
				this.playButton.remove();
				this.addTimer(this.gapTime, this.spawnGap.bind(this), true);
				this.addTimer(this.gapTimeFruit, this.spawnGapFruit.bind(this), true);
				this.addTimer(this.gapTimeEnemy, this.spawnGapEnemy.bind(this), true);

				if (this.gapTimeGameLife > 0)
					this.addTimer(this.gapTimeGameLife, this.spawnGapGameLife.bind(this), true);
			}
			this.player.jump();
		},

		keydown : function(key) {
			if (key === 'SPACE')
				this.mousedown();
		},

		showScore : function() {
			var box = new game.Sprite(game.system.width / 2, game.system.height / 2 - 250, 'media/gameover.png', {
				anchor : {
					x : 0.5,
					y : 0.5
				}
			});
					game.scene.highScore = parseInt(game.storage.get('highScore')) || 0;
					var tempHighSore = game.scene.highScore;
					if (game.scene.score > game.scene.highScore) {
						game.storage.set('highScore', game.scene.score);
						game.scene.highScore = game.scene.score;
					}

					var highScoreText = new game.BitmapText(game.scene.highScore.toString(), {
						font : 'Pixel'
					});
					highScoreText.position.x = 27;
					highScoreText.position.y = 43;
					box.addChild(highScoreText);

					var scoreText = new game.BitmapText('0', {
						font : 'Pixel'
					});
					scoreText.position.x = highScoreText.position.x;
					scoreText.position.y = -21;
					box.addChild(scoreText);

					game.scene.stage.addChild(box);

					game.scene.restartButton = new game.Sprite(game.system.width / 2, game.system.height / 2 + 70, 'media/restart.png', {
						anchor : {
							x : 0.5,
							y : 0.5
						},
						scale : {
							x : 0,
							y : 0
						},
						interactive : true,
						mousedown : function() {
							game.analytics.event('restart');
							game.system.setScene(SceneGame);
						}
					});

					if (game.scene.score > 0) {
						var time = Math.min(0.1, 1 / game.scene.score);
						var scoreCounter = 0;
						game.scene.addTimer(time, function() {
							scoreCounter++;
							scoreText.setText(scoreCounter.toString());
							if (scoreCounter >= game.scene.score) {
								this.repeat = false;
								if (game.scene.score > tempHighSore) {
									game.sound.playSound('highscore');
									var newBox = new game.Sprite(-208, 59, 'media/new.png');
									box.addChild(newBox);
								}
								//console.log("repeat call 1");
								game.scene.showRestartButton();
							}
						}, true);
					} else {
						//console.log("repeat call 2");
						game.scene.showRestartButton();
					}
					

		},

		showRestartButton : function() {
			
			this.addTween(this.restartButton.scale, {
				x : 1,
				y : 1
			}, 0.2, {
				easing : game.Tween.Easing.Back.Out
			}).start();
			this.stage.addChild(this.restartButton);
		},

		gameOver : function() {
			var i;
			this.cloudSpeedFactor = 0.2;
			this.ended = true;
			this.timers.length = 0;
			for ( i = 0; i < this.objects.length; i++) {
				if (this.objects[i].speed)
					this.objects[i].speed.x = 0;
			}
			for ( i = 0; i < this.world.bodies.length; i++) {
				this.world.bodies[i].velocity.set(0, 0);
			}

			this.addTimer(0.5, this.showScore.bind(this));

			this.totalLife = 0;
			this.lifeBar.scale.x = this.totalLife / 100;

			game.sound.stopMusic();
			game.sound.playSound('explosion');
		}
	});

});
