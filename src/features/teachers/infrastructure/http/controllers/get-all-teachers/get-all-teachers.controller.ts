import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PaginationDto } from '@/shared/application/dtos';

import { AuthGuard } from '@/features/auth/infrastructure/http/guards';
import { GetAllTeachersUseCase } from '@/features/teachers/application/usecases';

import { TeacherHttpMapper } from '../../mappers/teacher-http.mapper';

@ApiTags('teachers')
@Controller('teachers')
export class GetAllTeachersController {
  constructor(private readonly getAllTeachersUseCase: GetAllTeachersUseCase) {}

  @ApiOperation({ summary: 'Get all teachers' })
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
        path: '/teachers',
        data: [
          {
            id: '707b48f6-55da-443b-85b8-784b347e0347',
            userId: '165a48f6-55da-553c-85t4-704b347e0349',
            name: 'João Carlos da Rocha',
            isActive: false,
            createdAt: '2024-09-21T14:13:04.705Z',
            updatedAt: '2024-09-21T14:16:47.063Z',
            createdBy: 'af9a0f46-a9b1-4dae-a529-9df62f7767d0',
            updatedBy: null,
          },
          {
            id: 'b1f8f604-ad04-4cc9-bb0d-7165c74a33b5',
            userId: '165a48f6-55da-553c-85t4-704b347e0349',
            name: 'Luma Bitencour de Souza',
            isActive: true,
            createdAt: '2024-09-20T23:48:25.072Z',
            updatedAt: '2024-09-20T23:48:25.344Z',
            createdBy: 'af9a0f46-a9b1-4dae-a529-9df62f7767d0',
            updatedBy: null,
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
    const { teachers } = await this.getAllTeachersUseCase.execute({
      page,
      limit,
    });

    return teachers.map(TeacherHttpMapper.toHttp);
  }
}
