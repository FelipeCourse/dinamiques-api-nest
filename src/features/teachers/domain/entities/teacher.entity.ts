import {
  BaseEntity,
  BaseEntityProps,
} from '@/shared/domain/entities/base-entity';
import { OptionalType } from '@/shared/types';

import { NameValueObject } from '../value-objects';

export interface TeacherEntityProps extends BaseEntityProps {
  userId: string | null;
  name: NameValueObject;
}

export class TeacherEntity extends BaseEntity<TeacherEntityProps> {
  static create(
    props: OptionalType<TeacherEntityProps, 'userId'>,
    id?: string,
  ) {
    const userId = props.userId ?? null;
    const teacher = new TeacherEntity({ ...props, userId }, id);

    return teacher;
  }

  public get userId(): string | null {
    return this.props.userId;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get name(): NameValueObject {
    return this.props.name;
  }

  public set name(name: NameValueObject) {
    this.props.name = name;
  }
}
