class MotorCountError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MotorCountError';
  }
}

module.exports = MotorCountError;
