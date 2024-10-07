import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetCategoryByIdUseCase } from '@/features/categories/application/usecases';

import { CategoryHttpMapper } from '../../mappers/category-http.mapper';

@ApiTags('categories')
@Controller('categories')
export class GetCategoryByIdController {
  constructor(
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
  ) {}

  @ApiOperation({ summary: 'Get category by id' })
  @ApiParam({
    name: 'categoryId',
    required: true,
    description: 'Category id that will be obtained',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully obtaining',
    schema: {
      example: {
        statusCode: 200,
        method: 'GET',
        path: '/categories/4d1cfaff-7e0b-4c2d-a8e1-6d45f5774921',
        data: {
          id: '4d1cfaff-7e0b-4c2d-a8e1-6d45f5774921',
          name: 'Ciências',
          color: '#130981',
          isActive: true,
          createdAt: '2024-09-20T23:48:15.493Z',
          updatedAt: '2024-09-20T23:48:15.528Z',
          createdBy: '8c2wfafe-6e0c-2c2a-a8e0-4d45f4894930',
          updatedBy: null,
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
  @Get(':categoryId')
  public async handle(@Param('categoryId') categoryId: string) {
    const { category } = await this.getCategoryByIdUseCase.execute({
      categoryId,
    });

    return {
      ...CategoryHttpMapper.toHttp(category),
    };
  }
}
