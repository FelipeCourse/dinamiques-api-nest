export class InvalidCredentialsError extends Error {
  constructor(public override message: string) {
    super(message);

    this.name = 'InvalidCredentialsError';
  }
}
