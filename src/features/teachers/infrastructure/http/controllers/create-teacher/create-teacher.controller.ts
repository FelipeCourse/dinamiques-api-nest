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
import { CreateTeacherDto } from '@/features/teachers/application/dtos';
import { CreateTeacherUseCase } from '@/features/teachers/application/usecases';

@ApiTags('teachers')
@Controller('teachers')
export class CreateTeacherController {
  constructor(
    private readonly createTeacherUseCase: CreateTeacherUseCase,
    private readonly messageService: MessageService,
  ) {}

  @ApiOperation({ summary: 'Create a new teacher' })
  @ApiBearerAuth()
  @ApiBody({
    description: 'Object needed to create a new teacher',
    type: CreateTeacherDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Teacher created successfully',
    schema: {
      example: {
        statusCode: 201,
        method: 'POST',
        path: '/teachers',
        message: 'Docente criado com sucesso.',
        data: {
          id: '707b48f6-55da-443b-85b8-784b347e0347',
          createdAt: '2024-09-21T14:13:04.705Z',
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
    @Body() createTeacherDto: CreateTeacherDto,
    @CurrentUser() userEntity: UserEntity,
  ) {
    const { userId, name } = createTeacherDto;
    const teacher = await this.createTeacherUseCase.execute({
      userId,
      name,
      createdBy: userEntity.id,
    });
    const { message } = this.messageService.handleMessage({
      messageType: 'success',
      resource: 'Docente',
      action: 'created',
      gender: GenderEnum.MALE,
    });

    return {
      message,
      data: teacher,
    };
  }
}
