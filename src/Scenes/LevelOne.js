class LevelOne extends Phaser.Scene {

    constructor() {
        super("levelOne");
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
        this.map = this.add.tilemap("firstLevel", 16, 16, 15, 45);
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

        this.spikeLayer = this.map.createLayer("Harmful", this.tileset, 0, 0);
        this.spikeLayer.setScale(SCALE);
        this.spikeLayer.setCollisionByProperty({
            harmful: true
        });

        // ===  O B J E C T S  ===
        // jewels
        this.jewels = this.map.createFromObjects("Jewels", {
            name: "jewel",
            key: "tilemap_sheet",
            frame: 62
        });
        this.jewels.map((jewel) => {
            jewel.scale *= SCALE;
            jewel.x *= SCALE;
            jewel.y *= SCALE;
        });
        this.physics.world.enable(this.jewels, Phaser.Physics.Arcade.STATIC_BODY);
        this.jewelGroup = this.add.group(this.jewels);

        // springs :(
        my.sprite.spring1 = this.physics.add.staticSprite(80, 1168, 'spring_sprites', 'springUp1.png');
        my.sprite.spring1.setScale(SCALE);
        my.sprite.spring2 = this.physics.add.staticSprite(48, 816, 'spring_sprites', 'springUp1.png');
        my.sprite.spring2.setScale(SCALE);
        my.sprite.spring3 = this.physics.add.staticSprite(48, 400, 'spring_sprites', 'springUp1.png');
        my.sprite.spring3.setScale(SCALE);
        my.sprite.spring4 = this.physics.add.staticSprite(208, 208, 'spring_sprites', 'springUp1.png');
        my.sprite.spring4.setScale(SCALE);

        // exit
        my.sprite.exit = this.physics.add.staticSprite(432, 80, 'exit');
        my.sprite.exit.setScale(SCALE); 


        // ===  P L A Y E R I N I T  ===
        // original spawn: 80, 1344
        my.sprite.player = this.physics.add.sprite(80, 1344, "player_sprites", "playerIdle.png");
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.setScale(SCALE);


        // ===  C O N T R O L S  ===
        // movement
        cursors = this.input.keyboard.createCursorKeys();
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.jump = this.input.keyboard.addKey("SPACE");
        // extra
        this.reset = this.input.keyboard.addKey("R");
        this.goNext = this.input.keyboard.addKey("P");


        // ===  C A M E R A  ===
        this.cameras.main.setSize(480, 384);
        this.cameras.main.setBounds(0, 0, 480, 1472);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])


        // ===  P L A Y E R  C O L L I S I O N S   &   I N T E R A C T I O N S  ===
        // basic environment collisions
        this.physics.add.collider(my.sprite.player, this.blocksLayer);

        // reset level if player hits a spike
        this.physics.add.collider(my.sprite.player, this.spikeLayer, ()=>{
            this.scene.start("levelOne");
        });

        // player can jump onto a platform from directly below
        my.extraCollider = this.physics.add.collider(my.sprite.player, this.platformsLayer, null, function (obj1, obj2) {
            return((obj1.y + obj1.displayHeight/2) <= (obj2.y*16*SCALE + 5));
        });

        // pick up jewels
        this.physics.add.overlap(my.sprite.player, this.jewelGroup, (obj1, obj2) => {
            obj2.destroy();
            this.score += 20;
        });

        // springs launch player up
        this.physics.add.overlap(my.sprite.player, my.sprite.spring1, (obj1, obj2) => {
            obj1.setVelocityY(this.JUMP_VELOCITY * 2);
        });
        this.physics.add.overlap(my.sprite.player, my.sprite.spring2, (obj1, obj2) => {
            obj1.setVelocityY(this.JUMP_VELOCITY * 2);
        });
        this.physics.add.overlap(my.sprite.player, my.sprite.spring3, (obj1, obj2) => {
            obj1.setVelocityY(this.JUMP_VELOCITY * 2);
        });
        this.physics.add.overlap(my.sprite.player, my.sprite.spring4, (obj1, obj2) => {
            obj1.setVelocityY(this.JUMP_VELOCITY * 2);
        });

        // exit to next level
        this.physics.add.overlap(my.sprite.player, my.sprite.exit, (obj1, obj2) => {
            this.scene.start("levelTwo");
        }); 


        // ===  P A R T I C L E S  ===
        // walking vfx
        my.vfx.walking = this.add.particles(0, 0, "particle_sprites", {
            frames: ['S_smoke_particle.png', 'M_smoke_particle.png', 'L_smoke_particle.png'],
            random: true,
            maxAliveParticles: 8,
            lifespan: 200,
            gravityY: -200,
            scaleX: 1.5,
            scaleY: 1.5,
            follow: my.sprite.player,
            followOffset: {x:0, y:16}
        });
        my.vfx.walking.stop();
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

        // Reset Scene
        if(Phaser.Input.Keyboard.JustDown(this.reset)) {
            this.scene.restart();
        }

        // End Scene
        if(Phaser.Input.Keyboard.JustDown(this.goNext)) {
            this.scene.start('levelTwo');
        }
    }

}
