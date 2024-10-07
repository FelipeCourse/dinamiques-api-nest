export class NameValueObject {
  private constructor(private readonly name: string) {
    this.name = name;
  }

  private static validateNameLength(name: string): boolean {
    return name.length >= 3 && name.length <= 50;
  }

  public get value(): string {
    return this.name;
  }

  public static create(name: string) {
    const isNameLengthValid = this.validateNameLength(name.trim());

    if (!isNameLengthValid) {
      throw new Error(
        'Name must be greater than or equal to 3 and less than or equal to 50 characters.',
      );
    }

    return new NameValueObject(name.trim());
  }
}
