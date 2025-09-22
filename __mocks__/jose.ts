const jose = {
jwtVerify: jest.fn(),
  errors: {
    JWSInvalid: class JWSInvalid extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'JWSInvalid';
      }
    }
  }
};

module.exports = jose;