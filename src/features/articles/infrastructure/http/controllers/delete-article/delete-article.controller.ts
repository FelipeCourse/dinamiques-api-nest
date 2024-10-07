import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { DeleteArticleUseCase } from '@/features/articles/application/usecases';
import { AuthGuard } from '@/features/auth/infrastructure/http/guards';

@ApiTags('articles')
@Controller('articles')
export class DeleteArticleController {
  constructor(
    private readonly deleteArticleUseCase: DeleteArticleUseCase,
    private readonly messageService: MessageService,
  ) {}

  @ApiOperation({ summary: 'Deletes an article' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'articleId',
    required: true,
    description: 'Article id that will be deleted',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Article deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        method: 'DELETE',
        path: '/articles/4268c2b3-57e3-4d43-b5b8-43bbc7658278',
        message: 'Artigo removido com sucesso.',
      },
    },
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
    status: 500,
    description: 'Internal server error',
  })
  @UseGuards(AuthGuard)
  @Delete(':articleId')
  public async handle(@Param('articleId') articleId: string) {
    const { message } = this.messageService.handleMessage({
      messageType: 'success',
      resource: 'Artigo',
      action: 'deleted',
      gender: GenderEnum.MALE,
    });

    await this.deleteArticleUseCase.execute({ articleId });

    return { message };
  }
}
