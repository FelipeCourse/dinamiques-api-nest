import { ImageUrlValueObject } from '@/shared/domain/value-objects';

import {
  ContentValueObject,
  ReadingTimeValueObject,
  SlugValueObject,
  SummaryValueObject,
  TitleValueObject,
} from '../value-objects';
import { ArticleEntity } from './article.entity';

describe('ArticleEntity unit tests', () => {
  let article: ArticleEntity;

  beforeEach(() => {
    article = ArticleEntity.create({
      teacherId: '154ea5d0-dc65-4602-a8d0-e585eda81511',
      categoryId: '124ec5d0-dc65-5602-a8e1-e485eda81580',
      title: TitleValueObject.create('Teorema de Pitágoras'),
      summary: SummaryValueObject.create('Resumo de artigo de teste.'),
      readingTime: ReadingTimeValueObject.create(20),
      content: ContentValueObject.create('<h1>Test</h1>'),
      highlightImageUrl: ImageUrlValueObject.create('https://pexels.com/test'),
      createdBy: '415ae5c0-dc65-4602-a8e1-e485eda20521',
    });
  });

  it('should be able to create a article', () => {
    expect(article).toBeTruthy();
  });

  it('should be able to get the teacherId field', () => {
    expect(article.teacherId).toBeDefined();
    expect(typeof article.teacherId).toBe('string');
    expect(article.teacherId).toEqual('154ea5d0-dc65-4602-a8d0-e585eda81511');
  });

  it('should be able to set the teacherId field', () => {
    const newTeacherId = '121ee5d0-dc65-5604-a8c0-e485eda21129';

    article.teacherId = newTeacherId;

    expect(article.teacherId).toEqual(newTeacherId);
  });

  it('should be able to get the categoryId field', () => {
    expect(article.categoryId).toBeDefined();
    expect(typeof article.categoryId).toBe('string');
    expect(article.categoryId).toEqual('124ec5d0-dc65-5602-a8e1-e485eda81580');
  });

  it('should be able to set the categoryId field', () => {
    const newCategoryId = '888ex5d0-dc65-5609-a8e1-e485eda21110';

    article.categoryId = newCategoryId;

    expect(article.categoryId).toEqual(newCategoryId);
  });

  it('should be able to get the title field', () => {
    expect(article.title).toBeDefined();
    expect(typeof article.title.value).toBe('string');
    expect(article.title.value).toEqual('Teorema de Pitágoras');
  });

  it('should be able to set the title field', () => {
    const newTitle = TitleValueObject.create('Other Title');

    article.title = newTitle;

    expect(article.title.value).toEqual(newTitle.value);
  });

  it('should be able to get the slug field', () => {
    expect(article.slug).toBeDefined();
    expect(typeof article.slug.value).toBe('string');
    expect(article.slug.value).toEqual('teorema-de-pitagoras');
  });

  it('should be able to set the slug field', () => {
    const newTitle = SlugValueObject.create('Novo Título');

    article.slug = newTitle;

    expect(article.slug.value).toEqual(newTitle.value);
  });

  it('should be able to get the summary field', () => {
    expect(article.summary).toBeDefined();
    expect(typeof article.summary.value).toBe('string');
    expect(article.summary.value).toEqual('Resumo de artigo de teste.');
  });

  it('should be able to set the summary field', () => {
    const newSummary = SummaryValueObject.create('Other summary test.');

    article.summary = newSummary;

    expect(article.summary.value).toEqual(newSummary.value);
  });

  it('should be able to get the readingTime field', () => {
    expect(article.readingTime).toBeDefined();
    expect(typeof article.readingTime.value).toBe('number');
    expect(article.readingTime.value).toEqual(20);
  });

  it('should be able to set the readingTime field', () => {
    const newReadingTime = ReadingTimeValueObject.create(65);

    article.readingTime = newReadingTime;

    expect(article.readingTime.value).toEqual(newReadingTime.value);
  });

  it('should be able to get the content field', () => {
    expect(article.content).toBeDefined();
    expect(typeof article.content.value).toBe('string');
    expect(article.content.value).toEqual('<h1>Test</h1>');
  });

  it('should be able to set the content field', () => {
    const newContent = ContentValueObject.create('<h1>New Test Content</h1>');

    article.content = newContent;

    expect(article.content.value).toEqual(newContent.value);
  });

  it('should be able to get the highlightImageUrl field', () => {
    expect(article.highlightImageUrl).toBeDefined();
    expect(typeof article.highlightImageUrl.value).toBe('string');
    expect(article.highlightImageUrl.value).toEqual('https://pexels.com/test');
  });

  it('should be able to set the highlightImageUrl field', () => {
    const newHighlightImageUrl = ImageUrlValueObject.create(
      'https://pexels.com/test',
    );

    article.highlightImageUrl = newHighlightImageUrl;

    expect(article.highlightImageUrl.value).toEqual(newHighlightImageUrl.value);
  });

  it('should be able to get the publishedLastDate field', () => {
    expect(article.publishedLastDate).toBeDefined();
    expect(article.publishedLastDate).toBeInstanceOf(Date);
  });

  it('should be able to set the publishedLastDate field', () => {
    const changePublishedLastDate = new Date();

    article.publishedLastDate = changePublishedLastDate;

    expect(article.publishedLastDate).toEqual(changePublishedLastDate);
  });

  it('should be able to get the isPublished field', () => {
    expect(article.isPublished).toBeDefined();
    expect(typeof article.isPublished).toBe('boolean');
    expect(article.isPublished).toEqual(true);
  });

  it('should be able to set the isPublished field', () => {
    const changeIsPublished = false;

    article.isPublished = changeIsPublished;

    expect(article.isPublished).toEqual(changeIsPublished);
  });
});
