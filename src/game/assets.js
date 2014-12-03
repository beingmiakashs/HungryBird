game.module(
    'game.assets'
)
.require(
    'engine.sound'
)
.body(function() {

// Sprites
game.addAsset('media/player1.png');
game.addAsset('media/player2.png');
game.addAsset('media/logo2.png');
game.addAsset('media/logo1.png');
game.addAsset('media/cloud4.png');
game.addAsset('media/cloud3.png');
game.addAsset('media/cloud2.png');
game.addAsset('media/cloud1.png');
game.addAsset('media/ground.png');
game.addAsset('media/bushes.png');
game.addAsset('media/parallax3.png');
game.addAsset('media/parallax2.png');
game.addAsset('media/parallax1.png');
game.addAsset('media/particle.png');
game.addAsset('media/particle2.png');
game.addAsset('media/bar.png');
game.addAsset('media/gameover.png');
game.addAsset('media/new.png');
game.addAsset('media/restart.png');
game.addAsset('media/madewithpanda.png');
game.addAsset('media/play.png');
game.addAsset('media/share.png');
//game.addAsset('media/use.png');
game.addAsset('media/leaderboard.png');
game.addAsset('media/challange.png');
game.addAsset('media/send_request.png');

game.addAsset('media/bird_01.png');
game.addAsset('media/bird_02.png');
game.addAsset('media/bird_03.png');
game.addAsset('media/bird_04.png');
game.addAsset('media/bird_05.png');
game.addAsset('media/bird_06.png');
game.addAsset('media/bird_07.png');
game.addAsset('media/bird_08.png');

game.addAsset('media/life_bar_back.png');
game.addAsset('media/life_bar_front.png');

game.addAsset('media/f1.png');
game.addAsset('media/f2.png');
game.addAsset('media/f3.png');
game.addAsset('media/f4.png');

game.addAsset('media/e1.png');
game.addAsset('media/e2.png');
game.addAsset('media/e3.png');


// Font
game.addAsset('media/font.fnt');

// Sounds
game.addSound('media/sound/explosion.m4a', 'explosion');
game.addSound('media/sound/jump.m4a', 'jump');
game.addSound('media/sound/score.m4a', 'score');
game.addSound('media/sound/highscore.m4a', 'highscore');

// Music
game.addMusic('media/sound/music.m4a', 'music');

/*
game.Loader.inject({
    backgroundColor: 0xcccccc,

    initStage: function() {
        this.bar = new game.Graphics();
        this.bar.beginFill(0x00FF00);
        this.bar.drawRect(0, 0, 260, 40);

        this.bar.position.x = game.system.width / 2 - (260 / 2);
        this.bar.position.y = game.system.height / 2 - (40 / 2);

        this.bar.scale.x = this.percent / 100;

        game.system.stage.addChild(this.bar);
    },

    onPercentChange: function() {
        this.bar.scale.x = this.percent / 100;
    }
});*/

});
