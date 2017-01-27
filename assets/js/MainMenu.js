MyGame.MainMenu = function(game) {};
MyGame.MainMenu.prototype = {

  create: function() {
    this.start();
  },

  removeLogo: function() {
    this.state.start("Game");
  },

  start: function() {
  //  logo = game.add.sprite(0, 200, 'logo');
    this.removeLogo();
  }

};
