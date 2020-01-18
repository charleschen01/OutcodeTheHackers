"use strict";

// This is the main script. The entry point is the onPageLoaded function, as specified in the body tag of index.html
// It sets the scene and begins the game loop which updates and renders everything.

// this the Game object defined in Game.js
// it includes bots (an array), hackers (an array) and mapsize
var gameObject;   

// this is the grid that we see on the screen
var background;

// the precise time when we start the game
var startTime = null;

var gameStamp;

var graphics_context = null;

var delta;

// deviation from the original template
// no more entity and scene, because we already have existing objects
// but we still need components for rendering

function onPageLoaded() {

    // get the canvas block element from HTML
    var canvas = initialiseCanvas("game_canvas");

    // initialise game object (bots, hackers, mapsize)
    initialiseGameObject();

    // initialise the background object
    initialiseBackground(canvas);

    startGameLoop();  
}

function initialiseCanvas(canvas_name) {
    var canvas = document.getElementById(canvas_name);
    graphics_context = canvas.getContext("2d");

    return canvas;
}

function initialiseBackground(canvas) {

    background = new Background();
}

function initialiseGameObject() {

    //TODO
}

function startGameLoop() {

    //request the browser to call the update function before the next repaint
    window.requestAnimationFrame(update);
}

function update(timestamp) {

    //check if this is the first update we do
    if (startTime == null) {
        startTime = timestamp;
        gameStamp = 0;
    }

    delta = timestamp - startTime;

    //perform update and render only if we enter the next second/gameStamp
    if (delta/1000.0 > gameStamp) {

        //update the game state and render
        gameObject.step();
        render();

        //increment the gameStamp
        gameStamp++;
    }

    window.requestAnimationFrame(update);
}

function render() {
    //render background
    background.render(graphics_context);

    //render hackers and bots
    gameObject.render(graphics_context);
}