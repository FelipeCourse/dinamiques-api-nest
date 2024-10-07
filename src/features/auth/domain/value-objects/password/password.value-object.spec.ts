import { PasswordValueObject } from './password.value-object';

describe('PasswordValueObject unit tests', () => {
  it('should be able create an instance with a valid password and get the value', () => {
    const password = PasswordValueObject.create('s@adsk!s');

    expect(password.value).toBe('s@adsk!s');
  });

  it('should not be able to create a user password with less than 5 characters', () => {
    expect(() => PasswordValueObject.create('Aaaa')).toThrow();
  });

  it('should not be able to create a user password with more than 128 characters', () => {
    expect(() => PasswordValueObject.create('A'.repeat(129))).toThrow();
  });
});
