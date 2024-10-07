import { UsernameValueObject } from './username.value-object';

describe('UsernameValueObject unit tests', () => {
  it('should be able create an instance with a valid username and get the value', () => {
    const username = UsernameValueObject.create('jhon-doe');

    expect(username.value).toBe('jhon-doe');
  });

  it('should not be able to create a invalid username', () => {
    expect(() => UsernameValueObject.create('John Doe')).toThrow();
  });

  it('should not be able to create a username with less than 5 characters', () => {
    expect(() => UsernameValueObject.create('Aaaa')).toThrow();
  });

  it('should not be able to create a username with more than 30 characters', () => {
    expect(() => UsernameValueObject.create('A'.repeat(31))).toThrow();
  });
});
