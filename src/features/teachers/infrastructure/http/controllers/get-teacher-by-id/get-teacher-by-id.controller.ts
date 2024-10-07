import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '@/features/auth/infrastructure/http/guards';
import { GetTeacherByIdUseCase } from '@/features/teachers/application/usecases';

import { TeacherHttpMapper } from '../../mappers/teacher-http.mapper';

@ApiTags('teachers')
@Controller('teachers')
export class GetTeacherByIdController {
  constructor(private readonly getTeacherByIdUseCase: GetTeacherByIdUseCase) {}

  @ApiOperation({ summary: 'Get teacher by id' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Teacher id that will be obtained',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully obtaining',
    schema: {
      example: {
        statusCode: 200,
        method: 'GET',
        path: '/teachers/707b48f6-55da-443b-85b8-784b347e0347',
        data: {
          id: '707b48f6-55da-443b-85b8-784b347e0347',
          userId: '165a48f6-55da-553c-85t4-704b347e0349',
          name: 'João Carlos da Rocha',
          isActive: false,
          createdAt: '2024-09-21T14:13:04.705Z',
          updatedAt: '2024-09-21T14:16:47.063Z',
          createdBy: 'af9a0f46-a9b1-4dae-a529-9df62f7767d0',
          updatedBy: null,
        },
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
  @Get(':teacherId')
  public async handle(@Param('teacherId') teacherId: string) {
    const { teacher } = await this.getTeacherByIdUseCase.execute({
      teacherId,
    });

    return {
      ...TeacherHttpMapper.toHttp(teacher),
    };
  }
}
