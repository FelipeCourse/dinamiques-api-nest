import { NameValueObject } from './name.value-object';

describe('NameValueObject unit tests', () => {
  it('should be able create an instance with a valid name and get the value', () => {
    const name = NameValueObject.create('John Doe');

    expect(name.value).toBe('John Doe');
  });

  it('should not be able to create a teacher name with less than 5 characters', () => {
    expect(() => NameValueObject.create('Aaaa')).toThrow();
  });

  it('should not be able to create a teacher name with more than 255 characters', () => {
    expect(() => NameValueObject.create('A'.repeat(256))).toThrow();
  });
});
