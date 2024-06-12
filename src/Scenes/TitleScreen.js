class TitleScreen extends Phaser.Scene {

    constructor() {
        super("titleScreen");
    }

    create() {
        this.map = this.add.tilemap("title", 16, 16, 15, 12); // 480px x 384px
        this.tileset = this.map.addTilesetImage("one-bit-tiles", "tilemap_tiles");

        // layers
        this.bgLayer = this.map.createLayer("Background", this.tileset, 0, 0);
        this.bgLayer.setScale(SCALE);

        this.blocksLayer = this.map.createLayer("Ground-n-Walls", this.tileset, 0, 0);
        this.blocksLayer.setScale(SCALE);

        this.decoLayer = this.map.createLayer("Deco", this.tileset, 0, 0);
        this.decoLayer.setScale(SCALE);

        this.goNext = this.input.keyboard.addKey("P");

        // text objects
        const title = this.add.bitmapText(config.width/2, (config.height/2)-32, 'blocks_font', "Heist Heights", 48);
        title.setOrigin(0.5, 0.5);
        const prompt = this.add.bitmapText(config.width/2, 356, 'blocks_font', "Press any button to start", 24);
        prompt.setOrigin(0.5, 0.5);
        // start on any key pressed
        this.input.keyboard.on('keydown', event => {
            this.scene.start('story');
        });
    }

    update(){
    }
}