MyGame.Game = function (game) {
};
MyGame.Game.prototype = {

    init: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 2000;

        this.world.setBounds(0, 0, 360, 700);

        this.RUNNING_SPEED = 180;
        this.JUMPING_SPEED = 550;
    },


    start: function () {


    },


    create: function () {

        this.ground = this.add.sprite(0, 628, "ground");
        this.physics.arcade.enable(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        this.stage.backgroundColor = "#A2C9FF";

        this.jumpSound = this.sound.add("jump");
        this.pushSound = this.sound.add("push");
        this.killSound = this.sound.add("kill");

        // level data
        this.levelData = JSON.parse(this.game.cache.getText("level"));

        // platforms group
        this.platforms = this.add.group();
        this.platforms.enableBody = true;
        this.levelData.platformData.forEach(function (element) {
            this.platforms.create(element.x, element.y, "platform-" + element.size);
        }, this);
        this.platforms.setAll("body.immovable", true);
        this.platforms.setAll("body.allowGravity", false);

        // Walls
        this.walls = this.add.group();
        this.walls.enableBody = true;
        this.levelData.wallsData.forEach(function (element) {
            this.walls.create(element.x, element.y, "stone");
        }, this);
        this.walls.setAll("body.immovable", true);
        this.walls.setAll("body.allowGravity", false);

        // Trees
        this.trees = this.add.group();
        this.trees.enableBody = true;
        this.levelData.treesData.forEach(function (element) {
            this.trees.create(element.x, element.y, "tree");
        }, this);
        this.trees.setAll("body.immovable", true);
        this.trees.setAll("body.allowGravity", false);


        // crates
        this.crates = this.add.group();
        this.crates.enableBody = true;

        var crate;
        this.levelData.cratesData.forEach(function (element) {
            crate = this.crates.create(element.x, element.y, "crate");
            game.physics.arcade.enable(crate);
            crate.body.collideWorldBounds = true;

        }, this);
        //this.fires.setAll("body.allowGravity", false);

        // goal
        this.goal = this.add.sprite(this.levelData.goal.x, this.levelData.goal.y, "goal");
        this.physics.arcade.enable(this.goal);
        this.goal.body.allowGravity = false;

        // player
        this.player = this.add.sprite(10, 600, "player", 3);
        this.player.anchor.setTo(0.5);
        this.player.animations.add("walking", [0, 1, 2, 1], 6, true);
        this.physics.arcade.enable(this.player);
        this.player.customParams = {};
        this.player.body.collideWorldBounds = true;


        // barrels
        this.barrels = this.add.group();
        this.barrels.enableBody = true;
        this.createBarrel();
        this.barrelCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.barrelFrequency, this.createBarrel, this);

        // camera
        this.camera.follow(this.player);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // On screen controls
        this.createOnscreenControls();

    },

    update: function () {

        this.physics.arcade.collide(this.player, this.platforms);
        this.physics.arcade.collide(this.player, this.ground);
        this.physics.arcade.collide(this.player, this.crates);
        //   this.physics.arcade.collide(this.player, this.walls);
        this.physics.arcade.collide(this.crates, this.platforms);
        this.physics.arcade.collide(this.crates, this.walls);
        this.physics.arcade.collide(this.crates, this.ground);
        this.physics.arcade.collide(this.crates, this.crates);
        this.physics.arcade.collide(this.crates, this.trees);
        this.physics.arcade.collide(this.trees, this.platforms);
        this.physics.arcade.collide(this.barrels, this.platforms);
        this.physics.arcade.collide(this.barrels, this.ground);

        this.physics.arcade.collide(this.barrels, this.walls);
        this.physics.arcade.collide(this.barrels, this.trees);

//    this.physics.arcade.overlap(this.player, this.fires, this.killPlayer);
        //this.physics.arcade.overlap(this.player, this.barrels, this.collideEnemy(this.player, this.barrels));


        this.physics.arcade.overlap(this.player, this.barrels, this.collideEnemy, null, this);
        this.physics.arcade.overlap(this.player, this.goal, this.win);

        // Controls
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown || this.player.customParams.movingLeft) {
            this.player.body.velocity.x = -this.RUNNING_SPEED;
            this.player.scale.setTo(1, 1);
            this.player.play("walking");
        }
        else if (this.cursors.right.isDown || this.player.customParams.movingRight) {
            this.player.body.velocity.x = this.RUNNING_SPEED;
            this.player.scale.setTo(-1, 1);
            this.player.play("walking");
        }
        else {
            this.player.animations.stop();
            this.player.frame = 3;
        }

        if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
            this.player.body.velocity.y = -this.JUMPING_SPEED;
            this.player.customParams.mustJump = false;
            this.jumpSound.play();
        }

        this.barrels.forEach(function (barrel) {

            //this.physics.arcade.overlap(this.player, barrel, this.collideEnemy(this.player, barrel));

            if (barrel.x < 10 && barrel.y > 600) {
                barrel.kill();


            }
        }, this);

    },

    collideEnemy: function (player, enemy) {
        console.log('enemy collide');
        if (enemy.body.touching.up) {
            //Call a jump function or something here...
            // player.body.velocity.y = -200;
            // Maybe put the enemy into a different group so it doesn't collide with the player anymore...
            //   enemy.kill()
            enemy.kill();
        }
        else {
            //You would probably want something a little more than this...
            // player.kill();

            console.log('adsf');

            this.killPlayer();
        }
    },

    createOnscreenControls: function () {

        this.leftArrow = this.add.button(20, 535, "arrowButton");
        this.leftArrow.alpha = 0;
        this.leftArrow.fixedToCamera = true;

        this.rightArrow = this.add.button(110, 535, "arrowButton");
        this.rightArrow.alpha = 0;
        this.rightArrow.fixedToCamera = true;

        this.actionButton = this.add.button(280, 535, "actionButton");
        this.actionButton.alpha = 0;
        this.actionButton.fixedToCamera = true;

        // left
        this.leftArrow.events.onInputDown.add(function () {
            this.player.customParams.movingLeft = true;
        }, this);
        this.leftArrow.events.onInputUp.add(function () {
            this.player.customParams.movingLeft = false;
        }, this);

        this.leftArrow.events.onInputOver.add(function () {
            this.player.customParams.movingLeft = true;
        }, this);
        this.leftArrow.events.onInputOut.add(function () {
            this.player.customParams.movingLeft = false;
        }, this);

        // right
        this.rightArrow.events.onInputDown.add(function () {
            this.player.customParams.movingRight = true;
        }, this);
        this.rightArrow.events.onInputUp.add(function () {
            this.player.customParams.movingRight = false;
        }, this);

        this.rightArrow.events.onInputOver.add(function () {
            this.player.customParams.movingRight = true;
        }, this);
        this.rightArrow.events.onInputOut.add(function () {
            this.player.customParams.movingRight = false;
        }, this);

        // jump
        this.actionButton.events.onInputDown.add(function () {
            this.player.customParams.mustJump = true;
        }, this);
        this.actionButton.events.onInputUp.add(function () {
            this.player.customParams.mustJump = false;
        }, this);

    },

    killPlayer: function (player, fire) {
        console.log("Ouch!");
        this.killSound.play();
        game.state.start("Game");
    },

    win: function (player, goal) {
        alert("You win!");
        game.state.start("Game");
    },

    createBarrel: function () {
        // get first dead sprite
        var barrel = this.barrels.getFirstExists(false);

        if (!barrel) {
            barrel = this.barrels.create(0, 0, "barrel");
        }

        barrel.reset(this.levelData.goal.x, this.levelData.goal.y);
        barrel.body.velocity.x = this.levelData.barrelSpeed;
        barrel.body.collideWorldBounds = true;


        barrel.anchor.setTo(0.5);
        barrel.animations.add("walking", [0, 1, 2, 1], 6, true);
        barrel.body.bounce.set(1, 0);

    }
};
