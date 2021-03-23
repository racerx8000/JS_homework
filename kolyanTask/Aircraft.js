const AircraftTypeError = require('./AircraftTypeError');
const MotorCountError = require('./MotorCountError');
const AIRCRAFT_TYPES = require('./AIRCRAFT_TYPES');

class Aircraft {
  type = null;

  motors = 0;

  propeller = {};

  setType(type) {
    const arrOfTypes = Object.values(AIRCRAFT_TYPES);

    if (!arrOfTypes.includes(type)) {
      throw new AircraftTypeError('Wrong aircraft type!');
    }

    this.type = type;
  }

  addMotors(count) {
    if (this.type == null) {
      throw new AircraftTypeError('Aircraft type not set!');
    }
    if (this.type === AIRCRAFT_TYPES.plane) {
      if (count > 2) {
        throw new MotorCountError('Unacceptable motor count!');
      }
      this.motors = count;
    }
    if (this.type === AIRCRAFT_TYPES.copter) {
      if ((count < 3) || (count > 8)) {
        throw new MotorCountError('Unacceptable motor count!');
      }
      this.motors = count;
    }
  }

  addPropeller(diam, pitch) {
    if (this.type === null) {
      throw new AircraftTypeError('Aircraft type not set!');
    }

    this.propeller.diameter = diam;
    this.propeller.pitch = pitch;
  }
}

module.exports = Aircraft;
