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

import { CurrentUser } from '@/features/auth/application/decorators';
import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { AuthGuard } from '@/features/auth/infrastructure/http/guards';
import { CreateCategoryDto } from '@/features/categories/application/dtos';
import { CreateCategoryUseCase } from '@/features/categories/application/usecases';

@ApiTags('categories')
@Controller('categories')
export class CreateCategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly messageService: MessageService,
  ) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiBearerAuth()
  @ApiBody({
    description: 'Object needed to create a new category',
    type: CreateCategoryDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
    schema: {
      example: {
        statusCode: 201,
        method: 'POST',
        path: '/categories',
        message: 'Categoria criada com sucesso.',
        data: {
          id: '23ca26b5-d11a-43b6-ae83-bb80eac3373f',
          createdAt: '2024-09-21T12:59:33.628Z',
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
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() userEntity: UserEntity,
  ) {
    const { name, color } = createCategoryDto;
    const category = await this.createCategoryUseCase.execute({
      name,
      color,
      createdBy: userEntity.id,
    });
    const { message } = this.messageService.handleMessage({
      messageType: 'success',
      resource: 'Categoria',
      action: 'created',
      gender: GenderEnum.FEMALE,
    });

    return {
      message,
      data: category,
    };
  }
}
