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

import { AuthGuard } from '@/features/auth/infrastructure/http/guards';
import { DeleteTeacherUseCase } from '@/features/teachers/application/usecases';

@ApiTags('teachers')
@Controller('teachers')
export class DeleteTeacherController {
  constructor(
    private readonly deleteTeacherUseCase: DeleteTeacherUseCase,
    private readonly messageService: MessageService,
  ) {}

  @ApiOperation({ summary: 'Deletes a teacher' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'teacherId',
    required: true,
    description: 'Teacher id that will be deleted',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Teacher deleted successfully',
    schema: {
      example: {
        statusCode: 200,
        method: 'DELETE',
        path: '/teachers/707b48f6-55da-443b-85b8-784b347e0347',
        message: 'Docente removido com sucesso.',
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
  @Delete(':teacherId')
  public async handle(@Param('teacherId') teacherId: string) {
    const { message } = this.messageService.handleMessage({
      messageType: 'success',
      resource: 'Docente',
      action: 'deleted',
      gender: GenderEnum.MALE,
    });

    await this.deleteTeacherUseCase.execute({ teacherId, isSoftDelete: true });

    return { message };
  }
}
