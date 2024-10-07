export class NameValueObject {
  private constructor(private readonly name: string) {
    this.name = name;
  }

  private static validateNameLength(name: string): boolean {
    return name.length >= 5 && name.length <= 255;
  }

  public get value(): string {
    return this.name;
  }

  public static create(name: string) {
    const isNameLengthValid = this.validateNameLength(name.trim());

    if (!isNameLengthValid) {
      throw new Error(
        'Name must be greater than or equal to 5 and less than or equal to 255 characters.',
      );
    }

    return new NameValueObject(name.trim());
  }
}
