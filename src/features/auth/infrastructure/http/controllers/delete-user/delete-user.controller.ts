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

import { DeleteUserUseCase } from '@/features/auth/application/usecases';

import { AuthGuard } from '../../guards';

@ApiTags('users')
@Controller('users')
export class DeleteUserController {
  constructor(
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly messageService: MessageService,
  ) {}

  @ApiOperation({ summary: 'Deletes a user' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'User id that will be deleted',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        method: 'DELETE',
        path: '/users/302f48f6-55da-443b-85b8-784b344v4412',
        message: 'Usuário removido com sucesso.',
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
    status: 409,
    description: 'Conflict error',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @UseGuards(AuthGuard)
  @Delete(':userId')
  public async handle(@Param('userId') userId: string) {
    const { message } = this.messageService.handleMessage({
      messageType: 'success',
      resource: 'Usuário',
      action: 'deleted',
      gender: GenderEnum.MALE,
    });

    await this.deleteUserUseCase.execute({ userId, isSoftDelete: true });

    return { message };
  }
}
