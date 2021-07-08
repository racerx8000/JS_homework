class AircraftTypeError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AircraftTypeError';
  }
}

module.exports = AircraftTypeError;
