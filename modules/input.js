var easymidi = require('easymidi');
var inputs = easymidi.getInputs();

const socket = require("./socket");

var buttonID, buttonValue;

// Ion Discover DJ

//  - MIDI mapping of controller
const mapping = [
  // Controllers
  {
    id: 25,
    button: "jogwheelL",
    directional: true,
  },
  {
    id: 24,
    button: "jogwheelR",
    directional: true,
  },
  {
    id: 26,
    button: "browse",
    directional: true,
  },
  {
    id: 79,
    button: "browseClick",
    directional: false,
  },
  {
    id: 10,
    button: "crossfader",
    directional: true,
  },
  {
    id: 8,
    button: "volumeL",
    directional: false,
  },
  {
    id: 9,
    button: "volumeR",
    directional: false,
  },
  {
    id: 20,
    button: "bassL",
    directional: false,
  },
  {
    id: 21,
    button: "bassR",
    directional: false,
  },
  {
    id: 16,
    button: "trebleL",
    directional: false,
  },
  {
    id: 17,
    button: "trebleR",
    directional: false,
  },
  {
    id: 23,
    button: "masterVolume",
    directional: false,
  },
  // Buttons
  {
    id: 74,
    button: "playL",
    directional: false,
  },
  {
    id: 76,
    button: "playR",
    directional: false,
  },
  {
    id: 59,
    button: "cueL",
    directional: false,
  },
  {
    id: 66,
    button: "cueR",
    directional: false,
  },
  {
    id: 51,
    button: "revL",
    directional: false,
  },
  {
    id: 60,
    button: "revR",
    directional: false,
  },
  {
    id: 64,
    button: "syncL",
    directional: false,
  },
  {
    id: 71,
    button: "syncR",
    directional: false,
  },
  {
    id: 67,
    button: "pitchDownL",
    directional: false,
  },
  {
    id: 68,
    button: "pitchUpL",
    directional: false,
  },
  {
    id: 69,
    button: "pitchDownR",
    directional: false,
  },
  {
    id: 70,
    button: "pitchUpR",
    directional: false,
  },
  {
    id: 75,
    button: "loadA",
    directional: false,
  },
  {
    id: 52,
    button: "loadB",
    directional: false,
  },
  {
    id: 72,
    button: "reset",
    directional: false,
  },
]

// EasyMIDI - Read MIDI input

easymidi.getInputs().forEach((inputName) => {
    const input = new easymidi.Input(inputName);
    input.on('message', (msg) => {
      // Catch all MIDI input
      const vals = Object.keys(msg).map((key) => `${key}: ${msg[key]}`);
      read = (`${inputName}: ${vals.join(', ')}`);
      // Split values on types needed
      var split = read.split(" ");
      buttonID = parseInt(split[6].slice(0, split[6].length - 1));
      buttonValue = parseInt(split[8].slice(0, split[8].length - 1));
      console.log(buttonID, buttonValue);
      Press(buttonID, buttonValue);
    });
  });

function Press(id, value){
  var direction;
  var obj = mapping.find(x => {return x.id === id});
  if(!obj) return;
  if(obj.directional == true){
    if(value == 1){
      direction = "right";
    } else {
      direction = "left";
    }
  } else {
    console.log("Button");
  }
  console.log(obj.button + direction);
  socket.send(obj.button);
}