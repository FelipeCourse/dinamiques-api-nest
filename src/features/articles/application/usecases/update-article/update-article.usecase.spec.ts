import { NotFoundError } from '@/shared/domain/errors';
import { ImageUrlValueObject } from '@/shared/domain/value-objects';
import { GenderEnum } from '@/shared/enums';

import {
  ContentValueObject,
  ReadingTimeValueObject,
  SummaryValueObject,
  TitleValueObject,
} from '@/features/articles/domain/value-objects';

import { UpdateArticleUseCase } from './update-article.usecase';

const mockArticlesRepository = {
  getById: jest.fn(),
  update: jest.fn(),
};

const mockMessageService = {
  handleMessage: jest.fn(),
};

describe('UpdateArticleUseCase unit tests', () => {
  let updateArticleUseCase: UpdateArticleUseCase;

  beforeEach(() => {
    updateArticleUseCase = new UpdateArticleUseCase(
      mockArticlesRepository as any,
      mockMessageService as any,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to update title field when title is provided', async () => {
    const currentArticle = {
      categoryId: '124ec5d0-dc65-5602-a8e1-e485eda81580',
      title: TitleValueObject.create('Título Atual'),
      summary: SummaryValueObject.create('Resumo do artigo atual'),
      readingTime: ReadingTimeValueObject.create(5),
      content: ContentValueObject.create('<p>Conteúdo atual</p'),
      highlightImageUrl: ImageUrlValueObject.create('https://pexels.com/test'),
      isPublished: false,
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockArticlesRepository.getById.mockResolvedValue(currentArticle);
    mockArticlesRepository.update.mockResolvedValue(undefined);

    const request = {
      articleId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      title: 'Título Editado',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateArticleUseCase.execute(request);

    expect(mockArticlesRepository.getById).toHaveBeenCalledWith(
      request.articleId,
    );
    expect(mockArticlesRepository.update).toHaveBeenCalledWith(
      request.articleId,
      expect.objectContaining({
        categoryId: currentArticle.categoryId,
        title: TitleValueObject.create('Título Editado'),
        summary: currentArticle.summary,
        readingTime: currentArticle.readingTime,
        content: currentArticle.content,
        isPublished: currentArticle.isPublished,
      }),
    );
  });

  it('should be able to update summary field when summary is provided', async () => {
    const currentArticle = {
      categoryId: '124ec5d0-dc65-5602-a8e1-e485eda81580',
      title: TitleValueObject.create('Título Atual'),
      summary: SummaryValueObject.create('Resumo do artigo atual'),
      readingTime: ReadingTimeValueObject.create(5),
      content: ContentValueObject.create('<p>Conteúdo atual</p'),
      highlightImageUrl: '',
      isPublished: false,
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockArticlesRepository.getById.mockResolvedValue(currentArticle);
    mockArticlesRepository.update.mockResolvedValue(undefined);

    const request = {
      articleId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      summary: 'Resumo Editado',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateArticleUseCase.execute(request);

    expect(mockArticlesRepository.getById).toHaveBeenCalledWith(
      request.articleId,
    );
    expect(mockArticlesRepository.update).toHaveBeenCalledWith(
      request.articleId,
      expect.objectContaining({
        categoryId: currentArticle.categoryId,
        title: currentArticle.title,
        summary: SummaryValueObject.create('Resumo Editado'),
        readingTime: currentArticle.readingTime,
        content: currentArticle.content,
        isPublished: currentArticle.isPublished,
      }),
    );
  });

  it('should be able to update readingTime field when readingTime is provided', async () => {
    const currentArticle = {
      categoryId: '124ec5d0-dc65-5602-a8e1-e485eda81580',
      title: TitleValueObject.create('Título Atual'),
      summary: SummaryValueObject.create('Resumo do artigo atual'),
      readingTime: ReadingTimeValueObject.create(5),
      content: ContentValueObject.create('<p>Conteúdo atual</p'),
      highlightImageUrl: '',
      isPublished: false,
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockArticlesRepository.getById.mockResolvedValue(currentArticle);
    mockArticlesRepository.update.mockResolvedValue(undefined);

    const request = {
      articleId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      readingTime: 10,
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateArticleUseCase.execute(request);

    expect(mockArticlesRepository.getById).toHaveBeenCalledWith(
      request.articleId,
    );
    expect(mockArticlesRepository.update).toHaveBeenCalledWith(
      request.articleId,
      expect.objectContaining({
        categoryId: currentArticle.categoryId,
        title: currentArticle.title,
        summary: currentArticle.summary,
        readingTime: ReadingTimeValueObject.create(10),
        content: currentArticle.content,
        isPublished: currentArticle.isPublished,
      }),
    );
  });

  it('should be able to update content field when content is provided', async () => {
    const currentArticle = {
      categoryId: '124ec5d0-dc65-5602-a8e1-e485eda81580',
      title: TitleValueObject.create('Título Atual'),
      summary: SummaryValueObject.create('Resumo do artigo atual'),
      readingTime: ReadingTimeValueObject.create(5),
      content: ContentValueObject.create('<p>Conteúdo atual</p'),
      highlightImageUrl: '',
      isPublished: false,
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockArticlesRepository.getById.mockResolvedValue(currentArticle);
    mockArticlesRepository.update.mockResolvedValue(undefined);

    const request = {
      articleId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      content: '<h1>Novo conteúdo</h1>',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateArticleUseCase.execute(request);

    expect(mockArticlesRepository.getById).toHaveBeenCalledWith(
      request.articleId,
    );
    expect(mockArticlesRepository.update).toHaveBeenCalledWith(
      request.articleId,
      expect.objectContaining({
        categoryId: currentArticle.categoryId,
        title: currentArticle.title,
        summary: currentArticle.summary,
        readingTime: currentArticle.readingTime,
        content: ContentValueObject.create('<h1>Novo conteúdo</h1>'),
        isPublished: currentArticle.isPublished,
      }),
    );
  });

  it('should be able to update highlightImageUrl field when highlightImageUrl is provided', async () => {
    const currentArticle = {
      categoryId: '124ec5d0-dc65-5602-a8e1-e485eda81580',
      title: TitleValueObject.create('Título Atual'),
      summary: SummaryValueObject.create('Resumo do artigo atual'),
      readingTime: ReadingTimeValueObject.create(5),
      content: ContentValueObject.create('<p>Conteúdo atual</p'),
      highlightImageUrl: ImageUrlValueObject.create('https://pexels.com/test'),
      isPublished: false,
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockArticlesRepository.getById.mockResolvedValue(currentArticle);
    mockArticlesRepository.update.mockResolvedValue(undefined);

    const request = {
      articleId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      content: '<h1>Novo conteúdo</h1>',
      highlightImageUrl: 'https://pexels.com/change',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateArticleUseCase.execute(request);

    expect(mockArticlesRepository.getById).toHaveBeenCalledWith(
      request.articleId,
    );
    expect(mockArticlesRepository.update).toHaveBeenCalledWith(
      request.articleId,
      expect.objectContaining({
        categoryId: currentArticle.categoryId,
        title: currentArticle.title,
        summary: currentArticle.summary,
        readingTime: currentArticle.readingTime,
        content: ContentValueObject.create('<h1>Novo conteúdo</h1>'),
        highlightImageUrl: ImageUrlValueObject.create(
          'https://pexels.com/change',
        ),
        isPublished: currentArticle.isPublished,
      }),
    );
  });

  it('should be able to update isPublished field when isPublished is provided', async () => {
    const currentArticle = {
      categoryId: '124ec5d0-dc65-5602-a8e1-e485eda81580',
      title: TitleValueObject.create('Título Atual'),
      summary: SummaryValueObject.create('Resumo do artigo atual'),
      readingTime: ReadingTimeValueObject.create(5),
      content: ContentValueObject.create('<p>Conteúdo atual</p'),
      highlightImageUrl: '',
      isPublished: false,
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockArticlesRepository.getById.mockResolvedValue(currentArticle);
    mockArticlesRepository.update.mockResolvedValue(undefined);

    const request = {
      articleId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      isPublished: true,
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateArticleUseCase.execute(request);

    expect(mockArticlesRepository.getById).toHaveBeenCalledWith(
      request.articleId,
    );
    expect(mockArticlesRepository.update).toHaveBeenCalledWith(
      request.articleId,
      expect.objectContaining({
        categoryId: currentArticle.categoryId,
        title: currentArticle.title,
        summary: currentArticle.summary,
        readingTime: currentArticle.readingTime,
        content: currentArticle.content,
        isPublished: true,
      }),
    );
  });

  it('should be able to handle partial updates and not change unchanged fields', async () => {
    const currentArticle = {
      categoryId: '124ec5d0-dc65-5602-a8e1-e485eda81580',
      title: TitleValueObject.create('Título Atual'),
      summary: SummaryValueObject.create('Resumo do artigo atual'),
      readingTime: ReadingTimeValueObject.create(5),
      content: ContentValueObject.create('<p>Conteúdo atual</p'),
      highlightImageUrl: '',
      isPublished: false,
      createdBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    mockArticlesRepository.getById.mockResolvedValue(currentArticle);
    mockArticlesRepository.update.mockResolvedValue(undefined);

    const request = {
      articleId: '619ec5c0-dc65-4602-a8e1-e485eda80520',
      title: 'Título atualizado',
      content: '<p>Conteúdo atualizado</p>',
      updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
    };

    await updateArticleUseCase.execute(request);

    expect(mockArticlesRepository.getById).toHaveBeenCalledWith(
      request.articleId,
    );
    expect(mockArticlesRepository.update).toHaveBeenCalledWith(
      request.articleId,
      expect.objectContaining({
        categoryId: currentArticle.categoryId,
        title: TitleValueObject.create('Título atualizado'),
        summary: currentArticle.summary,
        readingTime: currentArticle.readingTime,
        content: ContentValueObject.create('<p>Conteúdo atualizado</p>'),
        isPublished: currentArticle.isPublished,
      }),
    );
  });

  it('should not be able to update a non existing article', async () => {
    mockArticlesRepository.getById.mockResolvedValue(null);
    mockMessageService.handleMessage.mockReturnValue({
      message: 'Artigo não encontrado.',
    });

    await expect(
      updateArticleUseCase.execute({
        articleId: 'fake-id',
        updatedBy: '629ec5c1-dc65-4602-f8e1-e485eda80529',
      }),
    ).rejects.toThrow(NotFoundError);

    expect(mockMessageService.handleMessage).toHaveBeenCalledWith({
      messageType: 'error',
      resource: 'Artigo',
      action: 'notFound',
      gender: GenderEnum.MALE,
    });
  });
});
