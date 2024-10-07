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
import { UserEntity } from '@/features/auth/domain/entities/user.entity';
import { AuthGuard } from '@/features/auth/infrastructure/http/guards';
import { UpdateTeacherDto } from '@/features/teachers/application/dtos';
import { UpdateTeacherUseCase } from '@/features/teachers/application/usecases';

@ApiTags('teachers')
@Controller('teachers')
export class UpdateTeacherController {
  constructor(
    private readonly updateTeacherUseCase: UpdateTeacherUseCase,
    private readonly messageService: MessageService,
  ) {}

  @ApiOperation({ summary: 'Update a teacher' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Teacher id that will be updated',
    type: String,
  })
  @ApiBody({
    description: 'Object needed to update a teacher',
    type: UpdateTeacherDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Teacher updated successfully',
    schema: {
      example: {
        statusCode: 200,
        method: 'PUT',
        path: '/teachers/707b48f6-55da-443b-85b8-784b347e0347',
        message: 'Docente editado com sucesso.',
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
  @Put(':teacherId')
  public async handle(
    @Param('teacherId') teacherId: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
    @CurrentUser() userEntity: UserEntity,
  ) {
    const { userId, name, isActive } = updateTeacherDto;
    const { message } = this.messageService.handleMessage({
      messageType: 'success',
      resource: 'Docente',
      action: 'updated',
      gender: GenderEnum.MALE,
    });

    await this.updateTeacherUseCase.execute({
      teacherId,
      userId,
      name,
      isActive,
      updatedBy: userEntity.id,
    });

    return {
      message,
    };
  }
}
