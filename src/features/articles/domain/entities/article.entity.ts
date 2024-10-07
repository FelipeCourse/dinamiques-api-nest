import {
  BaseEntity,
  BaseEntityProps,
} from '@/shared/domain/entities/base-entity';
import { ImageUrlValueObject } from '@/shared/domain/value-objects';
import { OptionalType } from '@/shared/types';

import {
  ContentValueObject,
  ReadingTimeValueObject,
  SlugValueObject,
  SummaryValueObject,
  TitleValueObject,
} from '../value-objects';

export interface ArticleEntityProps extends Omit<BaseEntityProps, 'isActive'> {
  teacherId: string;
  categoryId: string;
  title: TitleValueObject;
  slug: SlugValueObject;
  summary: SummaryValueObject;
  readingTime: ReadingTimeValueObject;
  content: ContentValueObject;
  highlightImageUrl: ImageUrlValueObject;
  publishedLastDate: Date;
  isPublished: boolean;
}

export class ArticleEntity extends BaseEntity<ArticleEntityProps> {
  static create(
    props: OptionalType<
      ArticleEntityProps,
      'slug' | 'publishedLastDate' | 'isPublished'
    >,
    id?: string,
  ) {
    const slug = SlugValueObject.create(props.title.value);
    const publishedLastDate = props.publishedLastDate ?? new Date();
    const isPublished = props.isPublished ?? true;
    const article = new ArticleEntity(
      {
        ...props,
        slug,
        publishedLastDate,
        isPublished,
      },
      id,
    );

    return article;
  }

  public get teacherId(): string {
    return this.props.teacherId;
  }

  public set teacherId(teacherId: string) {
    this.props.teacherId = teacherId;
  }

  public get categoryId(): string {
    return this.props.categoryId;
  }

  public set categoryId(categoryId: string) {
    this.props.categoryId = categoryId;
  }

  public get title(): TitleValueObject {
    return this.props.title;
  }

  public set title(title: TitleValueObject) {
    this.props.title = title;
  }

  public get slug(): SlugValueObject {
    return this.props.slug;
  }

  public set slug(slug: SlugValueObject) {
    this.props.slug = slug;
  }

  public get summary(): SummaryValueObject {
    return this.props.summary;
  }

  public set summary(summary: SummaryValueObject) {
    this.props.summary = summary;
  }

  public get readingTime(): ReadingTimeValueObject {
    return this.props.readingTime;
  }

  public set readingTime(readingTime: ReadingTimeValueObject) {
    this.props.readingTime = readingTime;
  }

  public get content(): ContentValueObject {
    return this.props.content;
  }

  public set content(content: ContentValueObject) {
    this.props.content = content;
  }

  public get highlightImageUrl(): ImageUrlValueObject {
    return this.props.highlightImageUrl;
  }

  public set highlightImageUrl(highlightImageUrl: ImageUrlValueObject) {
    this.props.highlightImageUrl = highlightImageUrl;
  }

  public get publishedLastDate(): Date {
    return this.props.publishedLastDate;
  }

  public set publishedLastDate(publishedLastDate: Date) {
    this.props.publishedLastDate = publishedLastDate;
  }

  public get isPublished(): boolean {
    return this.props.isPublished;
  }

  public set isPublished(isPublished: boolean) {
    this.props.isPublished = isPublished;
  }
}
