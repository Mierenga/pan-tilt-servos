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

function Servo(pin, centerPulse) {

  if (typeof centerPulse === 'number' && centerPulse >= MIN_PULSE && centerPulse <= MAX_PULSE) {
    this._centerPulse = centerPulse;
  } else {
    this._centerPulse = 1500;
  }
  this._pulseWidth = this._centerPulse;
  this._servo = new Gpio(pin, {mode:Gpio.OUTPUT});
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

Servo.prototype.getPulseWidth = function() {
  return this._pulseWidth;
}

Servo.prototype.moveToCenter = function() {
  this._pulseWidth = this._centerPulse;
}

module.exports = Servo;
