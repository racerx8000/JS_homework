const Aircraft = require('./Aircraft');
const BatteryChargeError = require('./BatteryChargeError');

class BatteryAircraft extends Aircraft {
  batteryCapacity = 5;

  currentBatteryCapacity = 2;

  async recharge(ah) {
    if (ah > (this.batteryCapacity - this.currentBatteryCapacity)) {
      throw new BatteryChargeError('Unacceptable charge capacity!');
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentBatteryCapacity += ah;
        resolve();
      }, ah);
    });
  }
}

module.exports = BatteryAircraft;
