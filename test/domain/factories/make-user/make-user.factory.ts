import { faker } from '@faker-js/faker';

import {
  UserEntity,
  UserEntityProps,
} from '@/features/auth/domain/entities/user.entity';
import {
  EmailValueObject,
  PasswordValueObject,
  UsernameValueObject,
} from '@/features/auth/domain/value-objects';

type Props = {
  email?: string;
  username?: string;
  password?: string;
};

export function MakeUserFactory(props: Props): UserEntityProps {
  const user = UserEntity.create({
    email: EmailValueObject.create(props.email ?? faker.internet.email()),
    username: UsernameValueObject.create(
      props.username ?? faker.internet.userName(),
    ),
    password: PasswordValueObject.create(
      props.password ?? faker.internet.password(),
    ),
    createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
  });

  return user;
}
