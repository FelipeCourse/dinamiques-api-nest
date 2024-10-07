export class SlugValueObject {
  private constructor(private readonly slug: string) {
    this.slug = slug;
  }

  private static generateSlug(title: string): string {
    return title
      .normalize('NFD')
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private static validateGeneratedSlug(title: string, slug: string): boolean {
    return this.generateSlug(title).length === slug.length;
  }

  public get value(): string {
    return this.slug;
  }

  public static create(title: string) {
    const slug = this.generateSlug(title);
    const isSlugValid = this.validateGeneratedSlug(title, slug);

    if (!isSlugValid) {
      throw new Error(
        'Slug must have the same number of title characters when slugified.',
      );
    }

    return new SlugValueObject(slug);
  }
}
