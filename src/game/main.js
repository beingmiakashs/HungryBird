game.module(
    'game.main'
)
.require(
    'engine.core',
    'engine.particle',
    'game.assets',
    'game.objects',
    'game.scenes'
)
.body(function(){

game.Storage.id = 'com.fatboys.fillcart';
game.System.idtkScale = 'ScaleAspectFill';
game.Analytics.id = 'UA-42024756-5';
//game.Debug.enabled = true;
//game.DebugDraw.enabled = true; 
game.start(SceneGame, 668, 1024);

});
