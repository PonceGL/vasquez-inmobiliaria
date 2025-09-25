const jose = {
  jwtVerify: jest.fn(),
  errors: {
    JWSInvalid: class JWSInvalid extends Error {
      constructor(message: string) {
        super(message);
        this.name = "JWSInvalid";
        Object.setPrototypeOf(this, JWSInvalid.prototype);
      }
      static get [Symbol.hasInstance]() {
        return (instance: Error) => instance?.name === "JWSInvalid";
      }
    },
    JWTExpired: class JWTExpired extends Error {
      constructor(message: string) {
        super(message);
        this.name = "JWTExpired";
        Object.setPrototypeOf(this, JWTExpired.prototype);
      }
      static get [Symbol.hasInstance]() {
        return (instance: Error) => instance?.name === "JWTExpired";
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

export const {
  jwtVerify,
  errors: { JWSInvalid, JWTExpired },
  SignJWT,
} = jose;
