import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '../value-objects';
import { UserEntity } from './user.entity';

describe('UserEntity unit tests', () => {
  let user: UserEntity;

  beforeEach(() => {
    user = UserEntity.create({
      email: EmailValueObject.create('jhon@test.com'),
      username: UsernameValueObject.create('jhonck'),
      password: PasswordValueObject.create('sd@1sa!sd'),
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    });
  });

  it('should be able to create a user', () => {
    expect(user).toBeTruthy();
  });

  it('should be able to get the email field', () => {
    expect(user.email).toBeDefined();
    expect(typeof user.email.value).toBe('string');
    expect(user.email.value).toEqual('jhon@test.com');
  });

  it('should be able to set the email field', () => {
    const newEmail = EmailValueObject.create('jhonck@test.com');

    user.email = newEmail;

    expect(user.email.value).toEqual(newEmail.value);
  });

  it('should be able to get the username field', () => {
    expect(user.username).toBeDefined();
    expect(typeof user.username.value).toBe('string');
    expect(user.username.value).toEqual('jhonck');
  });

  it('should be able to set the username field', () => {
    const newUsername = UsernameValueObject.create('jhonck9');

    user.username = newUsername;

    expect(user.username.value).toEqual(newUsername.value);
  });

  it('should be able to get the password field', () => {
    expect(user.password).toBeDefined();
    expect(typeof user.password.value).toBe('string');
    expect(user.password.value).toEqual('sd@1sa!sd');
  });

  it('should be able to set the password field', () => {
    const newPassword = PasswordValueObject.create('12345678');

    user.password = newPassword;

    expect(user.password.value).toEqual(newPassword.value);
  });
});
