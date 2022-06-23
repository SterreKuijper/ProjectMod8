var easymidi = require('easymidi');
var inputs = easymidi.getInputs();

var buttonID, buttonValue;

// Ion Discover DJ Mapping

//  - Controllers
    const jogwheelL = 25;
    const jogwheelR = 24;
    const crossfader = 10;
    const volumeL = 8;
    const volumeR = 9;
    const bassL = 20;
    const bassR = 21;
    const trebleL = 16;
    const trebleR = 17;
    const masterVolume = 23;

//  - Buttons
    const playL = 74;
    const playR = 76;
    const cueL = 59;
    const cueR = 66;
    const revL = 51;
    const revR = 60;
    const syncL = 64;
    const syncR = 71;
    const pitchDownL = 67;
    const pitchUpL = 68;
    const pitchDownR = 69;
    const pitchUpR = 70;
    const loadA = 75;
    const loadB = 52;
    const reset = 72;

// EasyMIDI - Read MIDI input

easymidi.getInputs().forEach((inputName) => {
    const input = new easymidi.Input(inputName);
    input.on('message', (msg) => {
      const vals = Object.keys(msg).map((key) => `${key}: ${msg[key]}`);
      read = (`${inputName}: ${vals.join(', ')}`);
      //console.log(read);
      var split = read.split(" ");
      buttonID = split[4];
      buttonValue = split[6];
      console.log(buttonID + buttonValue);
    });
  });   