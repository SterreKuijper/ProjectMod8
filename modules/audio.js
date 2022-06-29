const win = require('win-audio');
const speaker = win.speaker;

//Set minimum and maximum volume the user can control between.
const max = 30;
const min = 10;

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function control(controller){
    var volume = map(controller, 0, 100, min, max);
    speaker.set(parseInt(volume));
}

module.exports = { control };