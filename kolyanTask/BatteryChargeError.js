class BatteryChargeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BatteryChargeError';
  }
}

module.exports = BatteryChargeError;
