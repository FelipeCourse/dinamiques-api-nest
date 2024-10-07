import {
  BaseEntity,
  BaseEntityProps,
} from '@/shared/domain/entities/base-entity';

import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '../value-objects';

export interface UserEntityProps extends BaseEntityProps {
  email: EmailValueObject;
  username: UsernameValueObject;
  password: PasswordValueObject;
}

export class UserEntity extends BaseEntity<UserEntityProps> {
  static create(props: UserEntityProps, id?: string) {
    const user = new UserEntity(props, id);

    return user;
  }

  public get email(): EmailValueObject {
    return this.props.email;
  }

  public set email(email: EmailValueObject) {
    this.props.email = email;
  }

  public get username(): UsernameValueObject {
    return this.props.username;
  }

  public set username(username: UsernameValueObject) {
    this.props.username = username;
  }

  public get password(): PasswordValueObject {
    return this.props.password;
  }

  public set password(password: PasswordValueObject) {
    this.props.password = password;
  }
}
