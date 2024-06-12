class Ending extends Phaser.Scene {

    constructor() {
        super("ending");
    }
    init() {
        // variables and settings
        this.ACCELERATION = 300;
        this.DRAG = 900;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1600;
        this.JUMP_VELOCITY = -500;
        this.score = 0;
    }
    create() {
        // === T I L E M A P  &  T I L E S E T  ===
        this.map = this.add.tilemap("ending", 16, 16, 15, 45);
        this.physics.world.setBounds(0,0, 15*32 , 45*32);
        this.tileset = this.map.addTilesetImage("one-bit-tiles", "tilemap_tiles");

        // ===  L A Y E R S  ===
        this.bgLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        this.bgLayer.setScale(SCALE);

        this.blocksLayer = this.map.createLayer("Ground-n-Walls", this.tileset, 0, 0);
        this.blocksLayer.setScale(SCALE);
        this.blocksLayer.setCollisionByProperty({
            collides: true
        });

        this.platformsLayer = this.map.createLayer("Platforms", this.tileset, 0, 0);
        this.platformsLayer.setScale(2.0);
        this.platformsLayer.setCollisionByProperty({
            fallThrough: true
        });

        this.decoLayer = this.map.createLayer("Deco", this.tileset, 0, 0);
        this.decoLayer.setScale(SCALE);

        // ===  P L A Y E R I N I T ===
        // init
        my.sprite.player = this.physics.add.sprite(48, 240, "player_sprites", "playerIdle.png");
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.setScale(SCALE);

        // === C O N T R O L S ===
        // movement
        cursors = this.input.keyboard.createCursorKeys();
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.climb = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.jump = this.input.keyboard.addKey("SPACE");
        this.fall = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        // ===  P L A Y E R  C O L L I S I O N S   &   I N T E R A C T I O N S  ===
        // environment
        this.physics.add.collider(my.sprite.player, this.blocksLayer);

        my.extraCollider = this.physics.add.collider(my.sprite.player, this.platformsLayer, null, function (obj1, obj2) {
            return((obj1.y + obj1.displayHeight/2) <= (obj2.y*16*SCALE + 5));
        });

        // ===  P A R T I C L E S  ===
        // walking vfx
        my.vfx.walking = this.add.particles(0, 0, "particle_sprites", {
            frames: ['S_smoke_particle.png', 'M_smoke_particle.png', 'L_smoke_particle.png'],
            random: true,
            maxAliveParticles: 16,
            lifespan: 250,
            gravityY: -200,
            scaleX: 1.5,
            scaleY: 1.5,
            follow: my.sprite.player,
            followOffset: {x:0, y:16}
        });
        my.vfx.walking.stop();

        // === M E S S A G E  T E X T  ===
        this.add.bitmapText(32, 336, 'blocks_font', 'Looks like your mug is in another tower...', 24);
    }

    update(time, delta) {
        // === P L A Y E R  M O V E M E N T ===
        // Player Walk Left
        if(this.left.isDown || cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            // Only play smoke effect if touching the ground
            if (my.sprite.player.body.blocked.down) {
                my.vfx.walking.start();
            }
        // Player Walk Right
        } else if(this.right.isDown || cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
            // Only play smoke effect if touching the ground
            if (my.sprite.player.body.blocked.down) {
                my.vfx.walking.start();
            }
        // Player Idle
        } else {
            // Set acceleration to 0 and have DRAG take over
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            my.vfx.walking.stop();
        }

        // Player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
        }
        if(my.sprite.player.body.blocked.down && 
          (Phaser.Input.Keyboard.JustDown(cursors.up) || 
          (Phaser.Input.Keyboard.JustDown(this.jump)))) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
        }

        if(my.sprite.player.x >= 447) {
            this.scene.start('credits');
        }
    }
}