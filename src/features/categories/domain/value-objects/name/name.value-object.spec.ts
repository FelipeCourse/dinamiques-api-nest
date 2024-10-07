import { NameValueObject } from './name.value-object';

describe('NameValueObject unit tests', () => {
  it('should be able create an instance with a valid name and get the value', () => {
    const name = NameValueObject.create('John Doe');

    expect(name.value).toBe('John Doe');
  });

  it('should not be able to create a category name with less than 3 characters', () => {
    expect(() => NameValueObject.create('Aa')).toThrow();
  });

  it('should not be able to create a category name with more than 50 characters', () => {
    expect(() => NameValueObject.create('A'.repeat(51))).toThrow();
  });
});
