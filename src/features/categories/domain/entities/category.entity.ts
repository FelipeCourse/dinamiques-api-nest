import {
  BaseEntity,
  BaseEntityProps,
} from '@/shared/domain/entities/base-entity';

import { ColorValueObject, NameValueObject } from '../value-objects';

export interface CategoryEntityProps extends BaseEntityProps {
  name: NameValueObject;
  color: ColorValueObject;
}

export class CategoryEntity extends BaseEntity<CategoryEntityProps> {
  static create(props: CategoryEntityProps, id?: string) {
    const category = new CategoryEntity(props, id);

    return category;
  }

  public get name(): NameValueObject {
    return this.props.name;
  }

  public set name(name: NameValueObject) {
    this.props.name = name;
  }

  public get color(): ColorValueObject {
    return this.props.color;
  }

  public set color(color: ColorValueObject) {
    this.props.color = color;
  }
}
