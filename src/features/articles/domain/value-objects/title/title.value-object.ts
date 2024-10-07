export class TitleValueObject {
  private constructor(private readonly title: string) {
    this.title = title;
  }

  private static validateTitleLength(title: string): boolean {
    return title.length >= 3 && title.length <= 150;
  }

  public get value(): string {
    return this.title;
  }

  public static create(title: string) {
    const isTitleLengthValid = this.validateTitleLength(title.trim());

    if (!isTitleLengthValid) {
      throw new Error(
        'Title must be greater than or equal to 3 and less than or equal to 150 characters.',
      );
    }

    return new TitleValueObject(title.trim());
  }
}
