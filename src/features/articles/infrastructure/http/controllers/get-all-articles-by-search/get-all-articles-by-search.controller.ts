import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { QueryOptionsDto } from '@/shared/application/dtos';

import { GetAllArticlesBySearchUseCase } from '@/features/articles/application/usecases';

import { ArticleHttpMapper } from '../../mappers/article-http.mapper';

@ApiTags('articles')
@Controller('articles/search')
export class GetAllArticlesBySearchController {
  constructor(
    private readonly getAllArticlesBySearchUseCase: GetAllArticlesBySearchUseCase,
  ) {}

  @ApiOperation({ summary: 'Get all articles by search' })
  @ApiQuery({
    name: 'query',
    required: false,
    description: 'Search by term in title or content',
    type: String,
    example: 'fórmula',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of records per page',
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number to be returned',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully obtaining',
    schema: {
      example: {
        statusCode: 200,
        method: 'GET',
        path: '/articles',
        data: [
          {
            id: 'f6519c96-872f-4d92-90f0-32c887417616',
            teacherId: '707b48f6-55da-443b-85b8-784b347e0347',
            categoryId: 'f9036fac-e94c-4052-85a1-e54e955171b6',
            title: 'Fórmula de bhaskara',
            slug: 'formula-de-bhaskara',
            summary:
              'A fórmula de Bhaskara é um método resolutivo para equações do segundo grau cujo nome homenageia o grande matemático indiano que a demonstrou.',
            readingTime: 46,
            content:
              '<p>Essa fórmula nada mais é do que um método para encontrar as raízes reais de uma equação do segundo grau fazendo uso apenas de seus coeficientes.</p>',
            highlightImageUrl:
              'https://www.pexels.com/pt-br/foto/preto-e-branco-p-b-cidade-meio-urbano-21533286/',
            publishedLastDate: '2024-09-21T14:48:34.494Z',
            isPublished: true,
            createdAt: '2024-09-21T14:48:34.494Z',
            updatedAt: '2024-09-21T14:48:34.504Z',
            createdBy: '0515d759-e0d8-4c82-b204-48a2716545ed',
            updatedBy: '0515d759-e0d8-4c82-b204-48a2716545ed',
          },
          {
            id: 'c1f8f604-ad04-4cb0-bb0d-7165c74a33b8',
            teacherId: '707b48f6-55da-443b-85b8-784b347e0347',
            categoryId: 's0146fac-e94c-1052-88v0-f44e954122b2',
            title: 'Reforma Ortográfica',
            slug: 'reforma-ortografica',
            summary: 'A reforma ortográfica...',
            readingTime: 20,
            content: '<p>A reforma ortográfica</p>',
            highlightImageUrl: null,
            publishedLastDate: '2024-09-21T15:40:14.494Z',
            isPublished: true,
            createdAt: '2024-09-21T15:40:14.494Z',
            updatedAt: '2024-09-21T14:40:34.494Z',
            createdBy: '0515d759-e0d8-4c82-b204-48a2716545ed',
            updatedBy: null,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get()
  public async handle(@Query() queryOptionsDto: QueryOptionsDto) {
    const { query, page, limit } = queryOptionsDto;
    const { articles } = await this.getAllArticlesBySearchUseCase.execute({
      query,
      page,
      limit,
    });

    return articles.map(ArticleHttpMapper.toHttp);
  }
}
