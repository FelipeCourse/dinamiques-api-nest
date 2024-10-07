import { SlugValueObject } from './slug.value-object';

describe('SlugValueObject unit tests', () => {
  it('should be able create an instance with a valid slug and get the value', () => {
    const slug = SlugValueObject.create(
      'A importância da Reciclagem para o MEIO ambiente',
    );

    expect(slug.value).toBe('a-importancia-da-reciclagem-para-o-meio-ambiente');
  });

  it('should be able to validate that the generated slug has the same number of characters as the title', () => {
    const title = 'Another Test Title';
    const slug = SlugValueObject.create(title).value;

    expect(SlugValueObject.create(title).value.length).toBe(slug.length);
  });

  it('should not be able to create a article slug other than the title', () => {
    const title = 'Invalid slug';
    const validateGeneratedSlugSpy = jest
      .spyOn(SlugValueObject as any, 'validateGeneratedSlug')
      .mockImplementation(() => false);

    expect(() => {
      SlugValueObject.create(title);
    }).toThrow(
      'Slug must have the same number of title characters when slugified.',
    );

    validateGeneratedSlugSpy.mockRestore();
  });
});
