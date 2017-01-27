var MyGame = {};

MyGame.Boot = function() {};
MyGame.Boot.prototype = {

  init: function() {

    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

  },
  
  create: function() {
    this.state.start("Preloader");
  },
};
