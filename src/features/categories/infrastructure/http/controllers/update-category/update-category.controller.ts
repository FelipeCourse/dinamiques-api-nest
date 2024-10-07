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

import { CurrentUser } from '@/features/auth/application/decorators';
import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { AuthGuard } from '@/features/auth/infrastructure/http/guards';
import { UpdateCategoryDto } from '@/features/categories/application/dtos';
import { UpdateCategoryUseCase } from '@/features/categories/application/usecases';

@ApiTags('categories')
@Controller('categories')
export class UpdateCategoryController {
  constructor(
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly messageService: MessageService,
  ) {}

  @ApiOperation({ summary: 'Update a category' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'categoryId',
    required: true,
    description: 'Category id that will be updated',
    type: String,
  })
  @ApiBody({
    description: 'Object needed to update a category',
    type: UpdateCategoryDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    schema: {
      example: {
        statusCode: 200,
        method: 'PUT',
        path: '/categories/4d1cfaff-7e0b-4c2d-a8e1-6d45f5774921',
        message: 'Categoria editada com sucesso.',
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
  @Put(':categoryId')
  public async handle(
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @CurrentUser() userEntity: UserEntity,
  ) {
    const { name, color, isActive } = updateCategoryDto;
    const { message } = this.messageService.handleMessage({
      messageType: 'success',
      resource: 'Categoria',
      action: 'updated',
      gender: GenderEnum.FEMALE,
    });

    await this.updateCategoryUseCase.execute({
      categoryId,
      name,
      color,
      isActive,
      updatedBy: userEntity.id,
    });

    return {
      message,
    };
  }
}
