// Jim Whitehead
// Created: 4/14/2024
// Phaser: 3.70.0
//
// Cubey
//
// An example of putting sprites on the screen using Phaser
// 
// Art assets from Kenny Assets "Shape Characters" set:
// https://kenney.nl/assets/shape-characters

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    // map is 15x45 32px tiles
    // camera is 10 tiles high, 15 tiles wide
    width: 480,
    height: 320,
    scene: [LevelOne],
    fps: { forceSetTimeOut: true, target: 60 }
}

const game = new Phaser.Game(config);