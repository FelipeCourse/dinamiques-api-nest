import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetUserByIdUseCase } from '@/features/auth/application/usecases';

import { AuthGuard } from '../../guards';
import { UserHttpMapper } from '../../mappers/user-http.mapper';

@ApiTags('users')
@Controller('users')
export class GetUserByIdController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  @ApiOperation({ summary: 'Get user by id' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'User id that will be obtained',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully obtaining',
    schema: {
      example: {
        statusCode: 200,
        method: 'GET',
        path: '/users/302f48f6-55da-443b-85b8-784b344v4412',
        data: {
          id: '302f48f6-55da-443b-85b8-784b344v4412',
          email: 'jhon@test.com',
          username: 'jhonck',
          isActive: false,
          createdAt: '2024-09-26T14:13:04.705Z',
          updatedAt: '2024-09-26T14:16:47.063Z',
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
  @Get(':userId')
  public async handle(@Param('userId') userId: string) {
    const { user } = await this.getUserByIdUseCase.execute({
      userId,
    });

    return {
      ...UserHttpMapper.toHttp(user),
    };
  }
}
