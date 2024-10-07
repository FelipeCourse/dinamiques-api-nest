import { USERNAME_PATTERN } from '@/shared/patterns';

export class UsernameValueObject {
  private constructor(private readonly username: string) {
    this.username = username;
  }

  private static validateUsername(username: string): boolean {
    return USERNAME_PATTERN.test(username);
  }

  private static validateUsernameLength(username: string): boolean {
    return username.length >= 5 && username.length <= 30;
  }

  public get value(): string {
    return this.username;
  }

  public static create(username: string) {
    const isUsernameValid = this.validateUsername(username.trim());
    const isUsernameLengthValid = this.validateUsernameLength(username.trim());

    if (!isUsernameValid) {
      throw new Error('Username must be valid.');
    }

    if (!isUsernameLengthValid) {
      throw new Error(
        'Username must be greater than or equal to 5 and less than or equal to 30 characters.',
      );
    }

    return new UsernameValueObject(username.trim());
  }
}
