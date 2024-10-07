import { faker } from '@faker-js/faker';

import { ImageUrlValueObject } from '@/shared/domain/value-objects';

import {
  ArticleEntity,
  ArticleEntityProps,
} from '@/features/articles/domain/entities/article.entity';
import {
  ContentValueObject,
  ReadingTimeValueObject,
  SummaryValueObject,
  TitleValueObject,
} from '@/features/articles/domain/value-objects';

type Props = {
  teacherId?: string;
  categoryId?: string;
  title?: string;
  summary?: string;
  readingTime?: number;
  content?: string;
  highlightImageUrl?: string;
  isPublished?: boolean;
};

export function MakeArticleFactory(props: Props): ArticleEntityProps {
  const article = ArticleEntity.create({
    teacherId: props.title ?? '1',
    categoryId: props.categoryId ?? '1',
    title: TitleValueObject.create(props.title ?? faker.food.fruit()),
    summary: SummaryValueObject.create(
      props.summary ?? faker.food.description(),
    ),
    readingTime: ReadingTimeValueObject.create(props.readingTime ?? 20),
    content: ContentValueObject.create(props.content ?? '<h1>Test</h1>'),
    highlightImageUrl: ImageUrlValueObject.create(
      props.content ?? 'https://pexels.com/test',
    ),
    isPublished: props.isPublished ?? false,
    createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
  });

  return article;
}
