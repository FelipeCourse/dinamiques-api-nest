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
import { CreateUserDto } from '@/features/auth/application/dtos';
import { CreateUserUseCase } from '@/features/auth/application/usecases';
import { UserEntity } from '@/features/auth/domain/entities/user.entity';

import { AuthGuard } from '../../guards';

@ApiTags('users')
@Controller('users')
export class CreateUserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly messageService: MessageService,
  ) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBearerAuth()
  @ApiBody({
    description: 'Object needed to create a new user',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    schema: {
      example: {
        statusCode: 201,
        method: 'POST',
        path: '/users',
        message: 'Usuário criado com sucesso.',
        data: {
          id: '302f48f6-55da-443b-85b8-784b344v4412',
          createdAt: '2024-09-27T18:10:04.705Z',
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
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() userEntity: UserEntity,
  ) {
    const { email, username, password } = createUserDto;
    const user = await this.createUserUseCase.execute({
      email,
      username,
      password,
      createdBy: userEntity.id,
    });
    const { message } = this.messageService.handleMessage({
      messageType: 'success',
      resource: 'Usuário',
      action: 'created',
      gender: GenderEnum.MALE,
    });

    return {
      message,
      data: user,
    };
  }
}
