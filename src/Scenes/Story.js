class Story extends Phaser.Scene {
    constructor() {
        super("story");
    }

    create() {
        this.map = this.add.tilemap("background", 16, 16, 15, 12); // 480px x 384px
        this.tileset = this.map.addTilesetImage("one-bit-tiles", "tilemap_tiles");

        // layers
        this.bgLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        this.bgLayer.setScale(SCALE);

        // text objects
        const title = this.add.bitmapText(config.width/2, config.height/2, 'blocks_font', "Your up-upstair neighbors\ndropped by your home lately and\nstole your favorite mug while\nyou weren't looking. Now it's\nyour job to retrieve it.\n\nPress any key to continue", 24);
        title.setOrigin(0.5, 0.5);
        // start on any key pressed
        this.input.keyboard.on('keydown', event => {
            this.scene.start('levelOne');
        });
    }
    
    update(){
    }
}