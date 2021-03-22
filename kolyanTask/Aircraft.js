const AircraftTypeError = require('./AircraftTypeError');
const MotorCountError = require('./MotorCountError');

const AIRCRAFT_TYPES = {
  plane: 'plane',
  copter: 'copter',
};

class Aircraft {
  type = null;

  motors = 0;

  propeller = {};

  setType(type) {
    const arrOfTypes = Object.values(AIRCRAFT_TYPES);
    const aircraftTypeCheck = arrOfTypes.includes(type);
    if (!aircraftTypeCheck) {
      throw new AircraftTypeError('Wrong aircraft type!');
    }
    this.type = type;
  }

  addMotors(motorCount) {
    const aircraftType = this.type;
    if (aircraftType === null) {
      throw new AircraftTypeError('Aircraft type not set!');
    }

    const planeAircraft = AIRCRAFT_TYPES.plane;
    const wrongPlaneMotorCount = motorCount > 2;
    if ((aircraftType === planeAircraft) && wrongPlaneMotorCount) {
      throw new MotorCountError('Unacceptable motor count!');
    } else { this.motors = motorCount; }

    const copterAircraft = AIRCRAFT_TYPES.copter;
    const wrongСopterMotorCount = (motorCount < 3) || (motorCount > 8);
    if ((aircraftType === copterAircraft) && wrongСopterMotorCount) {
      throw new MotorCountError('Unacceptable motor count!');
    } else { this.motors = motorCount; }
  }

  addPropeller(propDiam, propPitch) {
    const aircraftType = this.type;
    const propellerObj = this.propeller;

    if (aircraftType === null) {
      throw new AircraftTypeError('Aircraft type not set!');
    }

    propellerObj.diameter = propDiam;
    propellerObj.pitch = propPitch;
  }
}

module.exports = Aircraft;

const plane = new Aircraft();

plane.setType('plane');
plane.addMotors(2);

console.log(plane.motors);
