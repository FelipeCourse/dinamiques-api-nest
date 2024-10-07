import { URL_PATTERN } from '@/shared/patterns';

export class ImageUrlValueObject {
  private constructor(private readonly imageUrl: string) {
    this.imageUrl = imageUrl;
  }

  private static validateImageUrl(imageUrl: string): boolean {
    return URL_PATTERN.test(imageUrl);
  }

  public get value(): string {
    return this.imageUrl;
  }

  public static create(imageUrl: string) {
    if (imageUrl) {
      const isImageUrlValid = this.validateImageUrl(imageUrl);

      if (!isImageUrlValid) {
        throw new Error('Image url must be a valid url.');
      }
    }

    return new ImageUrlValueObject(imageUrl);
  }
}
