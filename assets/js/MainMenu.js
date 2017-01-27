MyGame.MainMenu = function(game) {};
MyGame.MainMenu.prototype = {

  create: function() {

    this.start();

  },

  start: function() {
    
    this.state.start("Game");

  },

};