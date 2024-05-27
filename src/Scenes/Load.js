class Load extends Phaser.Scene {
    constructor() {
        super("load");
    }

    preload() {
        this.load.setPath("./assets/tilemaps/");
        // Load tilemap information
        this.load.image("tilemap_tiles", "tilemap_packed.png");
        this.load.tilemapTiledJSON("firstLevel", "LevelOne.tmj");   // Tilemap in JSON
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
        this.load.image('exit', 'exit.png');
        this.load.bitmapFont('blocks_font', 'Kenney Blocks Font.png', "Kenney Blocks Font.fnt");
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

        this.anims.create({
            key: 'spring',
            defaultTextureKey: "spring_sprites",
            frames: ["springUp1.png", "springUp2.png", "springUp1.png"],
            frameRate: 15
        });

         // ...and pass to the next Scene
         this.scene.start("levelOne");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}