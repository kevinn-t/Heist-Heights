class Load extends Phaser.Scene {
    constructor() {
        super("load");
    }

    preload() {
        this.load.setPath("./assets/tilemaps/");
        // Load tilemap information
        this.load.image("tilemap_tiles", "tilemap_packed.png");
        this.load.tilemapTiledJSON("title", "title.tmj");
        this.load.tilemapTiledJSON("background", "background.tmj"); // for exposition and credits
        this.load.tilemapTiledJSON("firstLevel", "LevelOne.tmj");   // playable level
        this.load.tilemapTiledJSON("secondLevel", "LevelTwo.tmj"); // playable level 2
        this.load.tilemapTiledJSON("ending", "End.tmj");
        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 16,
            frameHeight: 16
        });
        // Load spritesheets
        this.load.setPath("./assets/sprites/")
        this.load.atlas("player_sprites", "playerSprites.png", "playerSprites.json");
        this.load.atlas("particle_sprites", "particles.png", "particles.json");
        this.load.atlas("spring_sprites", "springs.png", "springs.json")

        // independent stuff
        this.load.setPath("./assets");
        this.load.image('exit', 'exit.png');
        this.load.bitmapFont('blocks_font', 'Blocks Font.png', "Blocks Font.xml");
    }

    create() {
        this.anims.create({
            key: 'idle',
            defaultTextureKey: "player_sprites",
            frames: [
                { frame: "playerIdle.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames("player_sprites", {
                prefix: "playerWalk",
                start: 1,
                end: 4,
                suffix: ".png"
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "player_sprites",
            frames: [
                { frame: "playerJump.png" }
            ],
        });

        this.scene.start("titleScreen");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}