import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetArticleByIdUseCase } from '@/features/articles/application/usecases';

import { ArticleHttpMapper } from '../../mappers/article-http.mapper';

@ApiTags('articles')
@Controller('articles')
export class GetArticleByIdController {
  constructor(private readonly getArticleByIdUseCase: GetArticleByIdUseCase) {}

  @ApiOperation({ summary: 'Get article by id' })
  @ApiParam({
    name: 'articleId',
    required: true,
    description: 'Article id that will be obtained',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully obtaining',
    schema: {
      example: {
        statusCode: 200,
        method: 'GET',
        path: '/articles/f6519c96-872f-4d92-90f0-32c887417616',
        data: {
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
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get(':articleId')
  public async handle(@Param('articleId') articleId: string) {
    const { article } = await this.getArticleByIdUseCase.execute({
      articleId,
    });

    return {
      ...ArticleHttpMapper.toHttp(article),
    };
  }
}
