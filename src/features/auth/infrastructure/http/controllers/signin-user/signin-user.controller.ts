import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GenderEnum } from '@/shared/enums';
import { MessageService } from '@/shared/infrastructure/services';

import { SigninUserDto } from '@/features/auth/application/dtos';
import { SigninUserUseCase } from '@/features/auth/application/usecases';

@ApiTags('users')
@Controller('users/signin')
export class SigninUserController {
  constructor(
    private readonly signinUserUseCase: SigninUserUseCase,
    private readonly messageService: MessageService,
  ) {}

  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiBody({
    description: 'Object needed to authenticate a user',
    type: SigninUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'User authenticated successfully',
    schema: {
      example: {
        statusCode: 200,
        method: 'POST',
        path: '/users/signin',
        message: 'Usuário autenticado com sucesso.',
        data: {
          id: '0c97f640-4de6-4a70-8a80-4f282ba7163e',
          accessToken:
            'fyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjOTdmNjQwLTRkZTYtNGE3MC04YTgwLTRmMjgyYmE3MTYzZSIsImlhdCI6MTcyNzYxNjA1NCwiZXhwIjoxNzI3NzAyNDU0fQ.pHBznHUpVB4LXTCjY2mL_kUEADLhe4wjXZAvjdk3Rgw',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @HttpCode(200)
  @Post()
  public async handle(@Body() signinUserDto: SigninUserDto) {
    const { email, password } = signinUserDto;
    const user = await this.signinUserUseCase.execute({
      email,
      password,
    });
    const { message } = this.messageService.handleMessage({
      messageType: 'success',
      resource: 'Usuário',
      action: 'signin',
      gender: GenderEnum.MALE,
    });

    return {
      message,
      data: user,
    };
  }
}
