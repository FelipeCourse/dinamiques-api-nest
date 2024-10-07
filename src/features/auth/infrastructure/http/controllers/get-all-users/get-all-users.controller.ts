import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationDto } from '@/shared/application/dtos';

import { GetAllUsersUseCase } from '@/features/auth/application/usecases';

import { AuthGuard } from '../../guards';
import { UserHttpMapper } from '../../mappers/user-http.mapper';

@ApiTags('users')
@Controller('users')
export class GetAllUsersController {
  constructor(private readonly getAllUsersUseCase: GetAllUsersUseCase) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
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
        path: '/users',
        data: [
          {
            id: '302f48f6-55da-443b-85b8-784b344v4412',
            email: 'jhon@test.com',
            username: 'jhonck',
            isActive: false,
            createdAt: '2024-09-26T14:13:04.705Z',
            updatedAt: '2024-09-26T14:16:47.063Z',
            createdBy: 'af9a0f46-a9b1-4dae-a529-9df62f7767d0',
            updatedBy: null,
          },
          {
            id: '301f27f6-55da-143b-85e9-101c344v4410',
            email: 'jhon@test.com',
            username: 'jhonck',
            isActive: true,
            createdAt: '2024-09-26T14:13:04.705Z',
            updatedAt: '2024-09-27T18:03:40.063Z',
            createdBy: 'af9a0f46-a9b1-4dae-a529-9df62f7767d0',
            updatedBy: 'af9a0f46-a9b1-4dae-a529-9df62f7767d0',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseGuards(AuthGuard)
  @Get()
  public async handle(@Query() paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const { users } = await this.getAllUsersUseCase.execute({
      page,
      limit,
    });

    return users.map(UserHttpMapper.toHttp);
  }
}
