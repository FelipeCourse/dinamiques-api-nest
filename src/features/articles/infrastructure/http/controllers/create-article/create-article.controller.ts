import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { CreateArticleDto } from '@/features/articles/application/dtos';
import { CreateArticleUseCase } from '@/features/articles/application/usecases';
import { CurrentUser } from '@/features/auth/application/decorators';
import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { AuthGuard } from '@/features/auth/infrastructure/http/guards';

@ApiTags('articles')
@Controller('articles')
export class CreateArticleController {
  constructor(
    private readonly createArticleUseCase: CreateArticleUseCase,
    private readonly messageService: MessageService,
  ) {}

  @ApiOperation({ summary: 'Create a new article' })
  @ApiBearerAuth()
  @ApiBody({
    description: 'Object needed to create a new article',
    type: CreateArticleDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Article created successfully',
    schema: {
      example: {
        statusCode: 201,
        method: 'POST',
        path: '/articles',
        message: 'Artigo criado com sucesso.',
        data: {
          id: '4268c2b3-57e3-4d43-b5b8-43bbc7658278',
          createdAt: '2024-09-21T14:43:02.690Z',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict error',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseGuards(AuthGuard)
  @Post()
  public async handle(
    @Body() createArticleDto: CreateArticleDto,
    @CurrentUser() userEntity: UserEntity,
  ) {
    const {
      teacherId,
      categoryId,
      title,
      summary,
      readingTime,
      content,
      highlightImageUrl,
    } = createArticleDto;
    const article = await this.createArticleUseCase.execute({
      teacherId,
      categoryId,
      title,
      summary,
      readingTime,
      content,
      highlightImageUrl,
      createdBy: userEntity.id,
    });

    const { message } = this.messageService.handleMessage({
      messageType: 'success',
      resource: 'Artigo',
      action: 'created',
      gender: GenderEnum.MALE,
    });

    return {
      message,
      data: article,
    };
  }
}
