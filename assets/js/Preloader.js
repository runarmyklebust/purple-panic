MyGame.Preloader = function(game) {};

MyGame.Preloader.prototype = {

  preload: function() {

    this.load.path = "assets/";

    this.load.image("ground", "img/ground.png");
    this.load.image("platform-360", "img/platform-360.png");
    this.load.image("platform-270", "img/platform-270.png");
    this.load.image("platform-210", "img/platform-210.png");
    this.load.image("platform-220", "img/platform-220.png");
    this.load.image("platform-180", "img/platform-180.png");
    this.load.image("platform-90", "img/platform-90.png");
    this.load.image("platform-45", "img/platform-45.png");
    this.load.image("arrowButton", "img/arrowButton.png");
    this.load.image("actionButton", "img/actionButton.png");
    this.load.image("stone", "img/stone.png");
    this.load.image("goal", "img/gorilla3.png");
    this.load.image("wall", "img/barrel.png");
    this.load.image("tree", "img/tree.png");
    this.load.image("splash", "img/splash.png");
    this.load.image("crate", "img/crate.png");

      this.load.spritesheet("barrel", "img/enemy.png", 28, 30, 5, 1, 1);

     this.load.image("push-start", "img/push-start.png");

         this.load.audio('jump','audio/jump.wav');
         this.load.audio('push','audio/push.mp3');
         this.load.audio('start','audio/start.wav');
         this.load.audio('kill','audio/explosion.mp3');

    this.load.spritesheet("player", "img/player.png", 28, 30, 5, 1, 1);

    // this.load.json("level", "data/level.json");
    this.load.text("level", "data/level.json");

  },

  create: function() {

    this.state.start("MainMenu");

  },

};
