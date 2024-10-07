import { ContentValueObject } from './content.value-object';

describe('ContentValueObject unit tests', () => {
  it('should be able create an instance with a valid content and get the value', () => {
    const content = ContentValueObject.create('<h1>Article Title<h1>');

    expect(content.value).toBe('<h1>Article Title<h1>');
  });

  it('should not be able to create a article content not equal other than string', () => {
    expect(() => ContentValueObject.create(0 as any)).toThrow();
  });
});
