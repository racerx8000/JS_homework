const Aircraft = require('./Aircraft');
const AircraftTypeError = require('./AircraftTypeError');
const FuelLevelError = require('./FuelLevelError');

class FuelAircraft extends Aircraft {
  setType(type) {
    if (type !== 'plane') {
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
    setTimeout(() => {
      this.fuelQuantity += addFuel;
      console.log(this.fuelQuantity);
    }, 2000);
  }
}

module.exports = FuelAircraft;
