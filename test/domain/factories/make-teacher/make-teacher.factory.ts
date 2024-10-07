import { faker } from '@faker-js/faker';

import {
  TeacherEntity,
  TeacherEntityProps,
} from '@/features/teachers/domain/entities/teacher.entity';
import { NameValueObject } from '@/features/teachers/domain/value-objects';

type Props = {
  userId?: string;
  name?: string;
};

export function MakeTeacherFactory(props: Props): TeacherEntityProps {
  const teacher = TeacherEntity.create({
    userId: props.userId ?? faker.lorem.word(),
    name: NameValueObject.create(props.name ?? faker.person.fullName()),
    createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
  });

  return teacher;
}
