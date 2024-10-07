import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { UpdateArticleDto } from '@/features/articles/application/dtos';
import { UpdateArticleUseCase } from '@/features/articles/application/usecases';
import { CurrentUser } from '@/features/auth/application/decorators';
import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { AuthGuard } from '@/features/auth/infrastructure/http/guards';

@ApiTags('articles')
@Controller('articles')
export class UpdateArticleController {
  constructor(
    private readonly updateArticleUseCase: UpdateArticleUseCase,
    private readonly messageService: MessageService,
  ) {}

  @ApiOperation({ summary: 'Update an article' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'articleId',
    required: true,
    description: 'Article id that will be updated',
    type: String,
  })
  @ApiBody({
    description: 'Object needed to update an article',
    type: UpdateArticleDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Article updated successfully',
    schema: {
      example: {
        statusCode: 200,
        method: 'PUT',
        path: '/articles/f6519c96-872f-4d92-90f0-32c887417616',
        message: 'Artigo editado com sucesso.',
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
    status: 404,
    description: 'Not found',
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
  @Put(':articleId')
  public async handle(
    @Param('articleId') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
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
      isPublished,
    } = updateArticleDto;
    const { message } = this.messageService.handleMessage({
      messageType: 'success',
      resource: 'Artigo',
      action: 'updated',
      gender: GenderEnum.MALE,
    });

    await this.updateArticleUseCase.execute({
      teacherId,
      articleId,
      categoryId,
      title,
      summary,
      readingTime,
      content,
      highlightImageUrl,
      isPublished,
      updatedBy: userEntity.id,
    });

    return {
      message,
    };
  }
}
