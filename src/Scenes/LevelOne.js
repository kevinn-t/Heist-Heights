class LevelOne extends Phaser.Scene {

    constructor() {
        super("levelOne")
    }

    init() {
        // variables and settings
        this.ACCELERATION = 300;
        this.DRAG = 900;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1600;
        this.JUMP_VELOCITY = -800;
    }

    create() {
        // Create a new tilemap game object which uses 16x16 pixel tiles, and is
        // 45 tiles tall and 15 tiles wide.
        this.map = this.add.tilemap("firstLevel", 16, 16, 15, 45);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("one-bit-tiles", "tilemap_tiles");

        // Create layers
        this.background = this.map.createLayer("Background", this.tileset, 0, 0);
        this.background.setScale(2.0);

        this.platAndWalls = this.map.createLayer("Platforms-n-Walls", this.tileset, 0, 0);
        this.platAndWalls.setScale(2.0);

        this.deco = this.map.createLayer("Deco", this.tileset, 0, 0);
        this.deco.setScale(2.0);

        this.climbables = this.map.createLayer("Climbables", this.tileset, 0, 0);
        this.climbables.setScale(2.0);

        this.spikes = this.map.createLayer("Harmful", this.tileset, 0, 0);
        this.spikes.setScale(2.0);

        this.exit = this.map.createLayer("Exit", this.tileset, 0, 0);
        this.exit.setScale(2.0);

        // Make them collidable
        this.platAndWalls.setCollisionByProperty({
            collides: true
        });
        this.spikes.setCollisionByProperty({
            harmful: true
        });

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(32, 1440-48, "playerIdle");
        my.sprite.player.setCollideWorldBounds(true);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.platAndWalls);
        this.physics.add.collider(my.sprite.player, this.spikes);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

    }

    update(time, delta) {

    }

}