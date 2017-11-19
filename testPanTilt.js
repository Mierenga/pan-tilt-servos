'use strict';

const Servo = require('./Servo');
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const pan = new Servo(23);
const tilt = new Servo(24);
let speed = Servo.Speed.NORMAL;

const keyFunctions = {
  q: () => { process.exit(0); },
  c: (key) => { if (key.ctrl) process.exit(0); },
  left: () => { pan.moveLeft(speed); },
  right: () => { pan.moveRight(speed); },
  up: () => { tilt.moveRight(speed); },
  down: () => { tilt.moveLeft(speed); },
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
    keyFunctions[key.name](key);
  } else {
    console.log('no function defined.');
    console.log('--------------------');
    console.log(str);
    console.log(key);
    console.log('--------------------');
  }
});

