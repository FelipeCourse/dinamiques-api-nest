export class ConflictError extends Error {
  constructor(public override message: string) {
    super(message);

    this.name = 'ConflictError';
  }
}
