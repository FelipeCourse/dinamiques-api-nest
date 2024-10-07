import { EMAIL_PATTERN } from '@/shared/patterns';

export class EmailValueObject {
  private constructor(private readonly email: string) {
    this.email = email;
  }

  private static validateEmail(email: string): boolean {
    return EMAIL_PATTERN.test(email);
  }

  private static validateEmailLength(email: string): boolean {
    return email.length >= 8 && email.length <= 255;
  }

  public get value(): string {
    return this.email;
  }

  public static create(email: string) {
    const isEmailValid = this.validateEmail(email.trim());
    const isEmailLengthValid = this.validateEmailLength(email.trim());

    if (!isEmailValid) {
      throw new Error('E-mail must be valid.');
    }

    if (!isEmailLengthValid) {
      throw new Error(
        'E-mail must be greater than or equal to 8 and less than or equal to 255 characters.',
      );
    }

    return new EmailValueObject(email.trim());
  }
}
