import { ColorValueObject } from './color.value-object';

describe('ColorValueObject unit tests', () => {
  it('should be able create an instance with a valid color and get the value', () => {
    const color = ColorValueObject.create('#ff2233');

    expect(color.value).toBe('#ff2233');
  });

  it('should be able create an instance without a color and get the default value', () => {
    const color = ColorValueObject.create('');

    expect(color.value).toBe('#000000');
  });

  it('should not be able to create a category other than the hexadecimal type', () => {
    expect(() => ColorValueObject.create('Abc')).toThrow();
  });
});
