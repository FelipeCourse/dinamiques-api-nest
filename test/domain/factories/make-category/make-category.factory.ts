import { faker } from '@faker-js/faker';

import {
  CategoryEntity,
  CategoryEntityProps,
} from '@/features/categories/domain/entities/category.entity';
import {
  ColorValueObject,
  NameValueObject,
} from '@/features/categories/domain/value-objects';

type Props = {
  name?: string;
  color?: string;
};

export function MakeCategoryFactory(props: Props): CategoryEntityProps {
  const category = CategoryEntity.create({
    name: NameValueObject.create(props.name ?? faker.person.fullName()),
    color: ColorValueObject.create('#000000'),
    createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
  });

  return category;
}
