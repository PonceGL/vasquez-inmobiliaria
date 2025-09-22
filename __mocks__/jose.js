const jose = {
  errors: {
    JWSInvalid: class JWSInvalid extends Error {
      constructor(message) {
        super(message);
        this.name = 'JWSInvalid';
      }
    }
  }
};

module.exports = jose;