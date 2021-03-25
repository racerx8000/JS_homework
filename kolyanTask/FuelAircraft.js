const Aircraft = require('./Aircraft');
const AircraftTypeError = require('./AircraftTypeError');
const FuelLevelError = require('./FuelLevelError');
const AIRCRAFT_TYPES = require('./AIRCRAFT_TYPES');

class FuelAircraft extends Aircraft {
  setType(type) {
    if (type !== AIRCRAFT_TYPES.plane) {
      throw new AircraftTypeError('Wrong aircraft type!');
    }
    super.setType(type);
  }

  tankCapacity = 0.4;

  fuelQuantity = 0.2;

  async refuel(addFuel) {
    if (addFuel > (this.tankCapacity - this.fuelQuantity)) {
      throw new FuelLevelError('Uncceptable fuel quantity!');
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        this.fuelQuantity += addFuel;
        resolve();
      }, (addFuel * 1000));
    });
  }
}

module.exports = FuelAircraft;
