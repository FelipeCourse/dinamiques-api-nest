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
import { UpdateUserDto } from '@/features/auth/application/dtos';
import { UpdateUserUseCase } from '@/features/auth/application/usecases';
import { UserEntity } from '@/features/auth/domain/entities/user.entity';

import { AuthGuard } from '../../guards';

@ApiTags('users')
@Controller('users')
export class UpdateUserController {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly messageService: MessageService,
  ) {}

  @ApiOperation({ summary: 'Update a user' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'User id that will be updated',
    type: String,
  })
  @ApiBody({
    description: 'Object needed to update a user',
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: {
      example: {
        statusCode: 200,
        method: 'PUT',
        path: '/users/302f48f6-55da-443b-85b8-784b344v4412',
        message: 'Usuário editado com sucesso.',
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
  @Put(':userId')
  public async handle(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() userEntity: UserEntity,
  ) {
    const { email, username, password, isActive } = updateUserDto;
    const { message } = this.messageService.handleMessage({
      messageType: 'success',
      resource: 'Usuário',
      action: 'updated',
      gender: GenderEnum.MALE,
    });

    await this.updateUserUseCase.execute({
      userId,
      email,
      username,
      password,
      isActive,
      updatedBy: userEntity.id,
    });

    return {
      message,
    };
  }
}
