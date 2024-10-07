import { TitleValueObject } from './title.value-object';

describe('TitleValueObject unit tests', () => {
  it('should be able create an instance with a valid title and get the value', () => {
    const title = TitleValueObject.create('Teorema de Pitágoras');

    expect(title.value).toBe('Teorema de Pitágoras');
  });

  it('should not be able to create a article title with less than 3 characters', () => {
    expect(() => TitleValueObject.create('Aa')).toThrow();
  });

  it('should not be able to create a article title with more than 150 characters', () => {
    expect(() => TitleValueObject.create('A'.repeat(151))).toThrow();
  });
});
