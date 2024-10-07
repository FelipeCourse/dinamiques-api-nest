export class ContentValueObject {
  private constructor(private readonly content: string) {
    this.content = content;
  }

  private static validateContentType(content: string): boolean {
    return typeof content === 'string';
  }

  public get value(): string {
    return this.content;
  }

  public static create(content: string) {
    const isContentTypeValid = this.validateContentType(content);

    if (!isContentTypeValid) {
      throw new Error('Content must be of type character.');
    }

    return new ContentValueObject(content);
  }
}
