import { HEXADECIMAL_COLOR_PATTERN } from '@/shared/patterns';

export class ColorValueObject {
  private constructor(private readonly color: string) {
    this.color = color;
  }

  private static validateColorHexadecimal(color: string): boolean {
    return HEXADECIMAL_COLOR_PATTERN.test(color);
  }

  public get value(): string {
    return this.color;
  }

  public static create(color: string) {
    const normalizedColor = color?.trim() || '#000000';
    const isColorHexadecimalValid =
      this.validateColorHexadecimal(normalizedColor);

    if (!isColorHexadecimalValid) {
      throw new Error('Color must be a valid hexadecimal.');
    }

    return new ColorValueObject(normalizedColor);
  }
}
