'use strict';

const Servo = require('./Servo');
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const blue = {
  pan: new Servo(23, 1500),
  tilt: new Servo(24, 1775)
};

const gray = {
  pan: new Servo(25, 1500),
  tilt: new Servo(8, 1700)
};

let speed = Servo.Speed.NORMAL;

const keyFunctions = {
  q: () => { process.exit(0); },
  c: (key) => {
    if (key.ctrl) {
      process.exit(0);
    } else {
      blue.tilt.moveToCenter();
      blue.pan.moveToCenter();
      gray.tilt.moveToCenter();
      gray.pan.moveToCenter();
    }
  },

  w: () => { blue.tilt.moveRight(speed); },
  s: () => { blue.tilt.moveLeft(speed); },
  a: () => { blue.pan.moveLeft(speed); },
  d: () => { blue.pan.moveRight(speed); },

  up: () => { gray.tilt.moveRight(speed); },
  down: () => { gray.tilt.moveLeft(speed); },
  left: () => { gray.pan.moveLeft(speed); },
  right: () => { gray.pan.moveRight(speed); },

  '0': () => { speed = Servo.Speed.DISABLED; },
  '1': () => { speed = Servo.Speed.SLOW; },
  '2': () => { speed = Servo.Speed.NORMAL; },
  '3': () => { speed = Servo.Speed.FAST; },
  '4': () => { speed = 4; },
  '5': () => { speed = 5; },
  '6': () => { speed = 6; },
  '7': () => { speed = 7; },
  '8': () => { speed = 8; },
  '9': () => { speed = 9; },
}


process.stdin.on('keypress', (str, key) => {
  if (keyFunctions[key.name] !== undefined) {
    console.log(key);
    keyFunctions[key.name](key);
  } else {
    console.log('no function defined.');
    console.log('--------------------');
    console.log(str);
    console.log(key);
    console.log('--------------------');
  }
  console.log('--------------------');
  console.log('blue: ');
  console.log('pan: ' + blue.pan.getPulseWidth());
  console.log('tilt: ' + blue.tilt.getPulseWidth());
  console.log('--------------------');
  console.log('gray: ');
  console.log('pan: ' + gray.pan.getPulseWidth());
  console.log('tilt: ' + gray.tilt.getPulseWidth());
  console.log('--------------------');

});

