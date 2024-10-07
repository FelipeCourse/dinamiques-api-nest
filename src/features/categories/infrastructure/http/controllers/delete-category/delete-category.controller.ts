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

import { AuthGuard } from '@/features/auth/infrastructure/http/guards';
import { DeleteCategoryUseCase } from '@/features/categories/application/usecases';

@ApiTags('categories')
@Controller('categories')
export class DeleteCategoryController {
  constructor(
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly messageService: MessageService,
  ) {}

  @ApiOperation({ summary: 'Deletes a category' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'categoryId',
    required: true,
    description: 'Category id that will be deleted',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Category deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        method: 'DELETE',
        path: '/categories/8496f37c-b05b-4860-9f4c-01c8bbf41896',
        message: 'Categoria removida com sucesso.',
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
  @Delete(':categoryId')
  public async handle(@Param('categoryId') categoryId: string) {
    const { message } = this.messageService.handleMessage({
      messageType: 'success',
      resource: 'Categoria',
      action: 'deleted',
      gender: GenderEnum.FEMALE,
    });

    await this.deleteCategoryUseCase.execute({ categoryId });

    return { message };
  }
}
