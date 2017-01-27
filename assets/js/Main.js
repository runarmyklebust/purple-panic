var game = new Phaser.Game(360, 592, Phaser.AUTO, "gameContainer");

game.state.add("Boot", MyGame.Boot);
game.state.add("Preloader", MyGame.Preloader);
game.state.add("MainMenu", MyGame.MainMenu);
game.state.add("Game", MyGame.Game);

game.state.start("Boot");