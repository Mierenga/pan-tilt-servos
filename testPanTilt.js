'use strict';

const Servo = require('./Servo');
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const blue = {
  pan: new Servo(23),
  tilt: new Servo(24)
};

const gray = {
  pan: new Servo(25),
  tilt: new Servo(8)
};

let speed = Servo.Speed.NORMAL;

const keyFunctions = {
  q: () => { process.exit(0); },
  c: (key) => { if (key.ctrl) process.exit(0); },

  left: () => { blue.pan.moveLeft(speed); },
  right: () => { blue.pan.moveRight(speed); },
  up: () => { blue.tilt.moveRight(speed); },
  down: () => { blue.tilt.moveLeft(speed); },

  w: () => { gray.tilt.moveRight(speed); },
  s: () => { gray.tilt.moveLeft(speed); },
  a: () => { gray.pan.moveLeft(speed); },
  d: () => { gray.pan.moveRight(speed); },

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
});

