const jose = {
  jwtVerify: jest.fn(),
  errors: {
    JWSInvalid: class JWSInvalid extends Error {
      constructor(message: string) {
        super(message);
        this.name = "JWSInvalid";
      }
    },
  },
  SignJWT: jest.fn(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    setIssuedAt: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue("mocked.jwt.token"),
  })),
};

module.exports = jose;