export class JWSInvalid extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JWSInvalid";
  }
}

export class JOSEError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "JOSEError";
  }
}