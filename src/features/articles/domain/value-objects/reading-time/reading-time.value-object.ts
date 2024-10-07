export class ReadingTimeValueObject {
  private constructor(private readonly readingTime: number) {
    this.readingTime = readingTime;
  }

  private static validateReadingTimeGreaterThanZero(
    readingTime: number,
  ): boolean {
    return readingTime > 0;
  }

  public get value(): number {
    return this.readingTime;
  }

  public static create(readingTime: number) {
    const isReadingTimeGreaterThanZeroValid =
      this.validateReadingTimeGreaterThanZero(readingTime);

    if (!isReadingTimeGreaterThanZeroValid) {
      throw new Error('Reading time must be greater than 0.');
    }

    return new ReadingTimeValueObject(readingTime);
  }
}
