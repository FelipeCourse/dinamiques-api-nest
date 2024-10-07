export class PasswordValueObject {
  private constructor(private readonly password: string) {
    this.password = password;
  }

  private static validatePasswordLength(password: string): boolean {
    return password.length >= 5 && password.length <= 128;
  }

  public get value(): string {
    return this.password;
  }

  public static create(password: string) {
    const isPasswordLengthValid = this.validatePasswordLength(password.trim());

    if (!isPasswordLengthValid) {
      throw new Error(
        'Password must be greater than or equal to 5 and less than or equal to 128 characters.',
      );
    }

    return new PasswordValueObject(password.trim());
  }
}
