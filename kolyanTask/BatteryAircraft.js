const Aircraft = require('./Aircraft');
const AircraftTypeError = require('./AircraftTypeError');
const BatteryChargeError = require('./BatteryChargeError');
const AIRCRAFT_TYPES = require('./AIRCRAFT_TYPES');

class BatteryAircraft extends Aircraft {
  setType(type) {
    if (type !== AIRCRAFT_TYPES.plane) {
      throw new AircraftTypeError('Wrong aircraft type!');
    }
    super.setType(type);
  }

  batteryCapacity = 5;

  currentBatteryCapacity = 2;

  async recharge(mah) {
    if (mah > (this.batteryCapacity - this.currentBatteryCapacity)) {
      throw new BatteryChargeError('Unacceptable charge capacity!');
    }
    setTimeout(() => {
      this.currentBatteryCapacity += mah;
    }, mah);
  }
}

module.exports = BatteryAircraft;
