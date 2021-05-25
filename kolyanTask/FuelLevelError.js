class FuelLevelError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FuelLevelError';
  }
}

module.exports = FuelLevelError;
