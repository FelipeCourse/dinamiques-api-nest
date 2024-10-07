import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { USERNAME_PATTERN } from '@/shared/patterns';

export class CreateUserDto {
  @ApiProperty({
    description: 'User e-mail',
    example: 'john@test.com',
  })
  @IsEmail({}, { message: 'E-mail deve ser válido.' })
  @IsNotEmpty({ message: 'E-mail é obrigatório.' })
  @Length(8, 255, {
    message: 'E-mail deve estar entre 8 e 255 caracteres.',
  })
  @IsString({ message: 'E-mail deve ser um valor textual.' })
  public readonly email!: string;

  @ApiProperty({
    description: 'Username',
    example: 'johnck',
  })
  @Matches(USERNAME_PATTERN, {
    message: 'Nome de usuário não pode conter espaços.',
  })
  @IsNotEmpty({ message: 'Nome de usuário é obrigatório.' })
  @Length(5, 30, {
    message: 'Nome de usuário deve estar entre 5 e 30 caracteres.',
  })
  @IsString({ message: 'Nome de usuário deve ser um valor textual.' })
  public readonly username!: string;

  @ApiProperty({
    description: 'User password',
    example: 'jl#sck8s',
  })
  @IsNotEmpty({ message: 'Senha é obrigatória.' })
  @Length(5, 128, {
    message: 'Senha deve estar entre 5 e 128 caracteres.',
  })
  public readonly password!: string;
}
