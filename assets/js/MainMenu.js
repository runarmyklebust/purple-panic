MyGame.MainMenu = function(game) {};
MyGame.MainMenu.prototype = {

  create: function() {
    this.start();
  },

  removeLogo: function() {
    this.state.start("Game");
  },

  start: function() {
    logo = game.add.sprite(0, 0, 'splash');


      var pushStart = game.add.sprite(100, 300, 'push-start');

      //pushStart.anchor.setTo(100, 300);
      pushStart.alpha = 0.2;

      game.add.tween(pushStart).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 500, 1000, true);

      var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);



          space_key.onDown.add(this.removeLogo, this);/*

      if (this.cursors.left.clicked) {
        console.log('test');
          this.removeLogo();
      }*/
    //this.removeLogo();
  }

};
