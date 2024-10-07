export class SummaryValueObject {
  private constructor(private readonly summary: string) {
    this.summary = summary;
  }

  private static validateSummaryLength(summary: string): boolean {
    return summary.length >= 10 && summary.length <= 200;
  }

  public get value(): string {
    return this.summary;
  }

  public static create(summary: string) {
    const isSummaryLengthValid = this.validateSummaryLength(summary.trim());

    if (!isSummaryLengthValid) {
      throw new Error(
        'Summary must be greater than or equal to 10 and less than or equal to 200 characters.',
      );
    }

    return new SummaryValueObject(summary.trim());
  }
}
