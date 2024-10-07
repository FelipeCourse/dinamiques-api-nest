import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninUserDto {
  @ApiProperty({
    description: 'User e-mail',
    example: 'john@test.com',
  })
  @IsEmail({}, { message: 'E-mail deve ser válido.' })
  @IsNotEmpty({ message: 'E-mail é obrigatório.' })
  @IsString({ message: 'E-mail deve ser um valor textual.' })
  public readonly email!: string;

  @ApiProperty({
    description: 'User password',
    example: 'jl#sck8s',
  })
  @IsNotEmpty({ message: 'Senha é obrigatória.' })
  public readonly password!: string;
}
