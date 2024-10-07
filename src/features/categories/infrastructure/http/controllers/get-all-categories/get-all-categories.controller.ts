import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginationDto } from '@/shared/application/dtos';

import { GetAllCategoriesUseCase } from '@/features/categories/application/usecases';

import { CategoryHttpMapper } from '../../mappers/category-http.mapper';

@ApiTags('categories')
@Controller('categories')
export class GetAllCategoriesController {
  constructor(
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
  ) {}

  @ApiOperation({ summary: 'Get all categories' })
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
        path: '/categories',
        data: [
          {
            id: 'd25473ac-32d6-4c2f-827e-691e7c810b02',
            name: 'Português',
            color: '#222123',
            isActive: true,
            createdAt: '2024-09-21T13:18:39.525Z',
            updatedAt: '2024-09-20T23:48:15.528Z',
            createdBy: 'f21933bc-31d6-4c2f-817c-444a2b310b41',
            updatedBy: null,
          },
          {
            id: '0515d759-e0d8-4c82-b204-48a2716545ed',
            name: 'Geografia',
            color: '#123222',
            isActive: true,
            createdAt: '2024-09-21T13:18:52.827Z',
            updatedAt: '2024-09-24T13:18:10.528Z',
            createdBy: 'f21933bc-31d6-4c2f-817c-444a2b310b41',
            updatedBy: 'f21933bc-31d6-4c2f-817c-444a2b310b41',
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
  public async handle(@Query() paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const { categories } = await this.getAllCategoriesUseCase.execute({
      page,
      limit,
    });

    return categories.map(CategoryHttpMapper.toHttp);
  }
}
