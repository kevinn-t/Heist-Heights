class Load extends Phaser.Scene {
    constructor() {
        super("load");
    }

    preload() {
        this.load.setPath("./assets/tilemaps/");
        // Load tilemap information
        this.load.image("tilemap_tiles", "tilemap_packed.png");
        this.load.tilemapTiledJSON("firstLevel", "LevelOne.tmj");   // Tilemap in JSON

        this.load.setPath("./assets/sprites/");
        this.load.image("playerIdle", "playerIdle.png");
        this.load.image("playerWalk1", "playerWalk1.png");
        this.load.image("playerWalk2", "playerWalk2.png");
        this.load.image("playerWalk3", "playerWalk3.png");
        this.load.image("playerWalk4", "playerWalk4.png");
        this.load.image("playerJump", "playerJump.png");
        this.load.image("springIdle", "springIdle.png");
        this.load.image("springUp1", "springUp1.png");
        this.load.image("springUp2", "springUp2.png");
        this.load.image("jewelDefault", "jewelDefault.png");
        this.load.image("jewelShining", "jewelShining.png");
    }

    create() {
        this.anims.create({
            key: 'idle',
            frames: ["playerIdle"],
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: ["playerWalk1", "playerWalk2", "playerWalk3", "playerWalk4"],
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: ["playerJump"]
        });

        this.anims.create({
            key: 'jewel',
            frames: ["jewelShining", "jewelDefault"],
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'spring',
            frames: ["springIdle", "springUp1", "springUp2"],
            frameRate: 15
        });

         // ...and pass to the next Scene
         this.scene.start("levelOne");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}