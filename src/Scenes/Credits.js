class Credits extends Phaser.Scene {
    constructor() {
        super("credits");
    }

    create() {
        this.map = this.add.tilemap("background", 16, 16, 15, 12); // 480px x 384px
        this.tileset = this.map.addTilesetImage("one-bit-tiles", "tilemap_tiles");

        // layers
        this.bgLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        this.bgLayer.setScale(SCALE);

        // text objects
        const title = this.add.bitmapText(config.width/2, config.height/2, 'blocks_font', 
            "Assets from kenney.nl\n\nProgramming & Design by Kevin Tan",24);
        title.setOrigin(0.5, 0.5);
    }
    
    update(){
    }
}