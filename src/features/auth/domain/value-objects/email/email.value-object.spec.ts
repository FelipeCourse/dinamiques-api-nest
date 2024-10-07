import { EmailValueObject } from './email.value-object';

describe('EmailValueObject unit tests', () => {
  it('should be able create an instance with a valid email and get the value', () => {
    const email = EmailValueObject.create('jhon@test.com');

    expect(email.value).toBe('jhon@test.com');
  });

  it('should not be able to create a invalid user email', () => {
    expect(() => EmailValueObject.create('jhn')).toThrow();
  });

  it('should not be able to create a user email with less than 8 characters', () => {
    expect(() => EmailValueObject.create('j@j.com')).toThrow();
  });

  it('should not be able to create a user email with more than 255 characters', () => {
    expect(() => EmailValueObject.create('A'.repeat(256))).toThrow();
  });
});
