// Kevin Tan
// Created: 5/14/2024
// Phaser: 3.70.0
//
// Mah Muhg
//
// A upward side-scrolling platformer. 
// 
// Art assets from Kenny Assets "1-Bit Platformer Pack" set:
// https://kenney.nl/assets/1-bit-platformer-pack

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    // map is 15x45 32px tiles: 480x1440
    width: 480, // camera width
    height: 320, // camera height
    scene: [Load, LevelOne, Ending]
}

var cursors;
const SCALE = 2.0;
var my = {sprite: {}, text: {}, vfx: {}};
const game = new Phaser.Game(config);