'use strict'

const Gpio = require('pigpio').Gpio;

const UPDATE_INTERVAL_MS = 25;
const BASE_INCREMENT = 25;
let MIN_PULSE = 600;
let MAX_PULSE = 2400;

Servo.Speed = {
  DISABLED: 0,
  SLOW: 1,
  NORMAL: 2, 
  FAST: 3
};

function Servo(pin) {

  this._servo = new Gpio(pin, {mode:Gpio.OUTPUT});
  this._pulseWidth = 1500;
  this._update = setInterval(() => {
    //console.log(this._pulseWidth);
    this._servo.servoWrite(this._pulseWidth);
  }, UPDATE_INTERVAL_MS);
}

Servo.prototype.moveLeft = function(speed) {
  if (speed === undefined) {
    speed = Servo.speed.NORMAL;
  }
  let newPulse = this._pulseWidth - (BASE_INCREMENT * speed);
  if (newPulse < MIN_PULSE) {
    this._pulseWidth = MIN_PULSE;
  } else {
    this._pulseWidth = newPulse;
  }
};

Servo.prototype.moveRight = function(speed) {
  if (speed === undefined) {
    speed = Servo.speed.NORMAL;
  }

  let newPulse = this._pulseWidth + (BASE_INCREMENT * speed);
  if (newPulse > MAX_PULSE) {
    this._pulseWidth = MAX_PULSE;
  } else {
    this._pulseWidth = newPulse;
  }
};

module.exports = Servo;
