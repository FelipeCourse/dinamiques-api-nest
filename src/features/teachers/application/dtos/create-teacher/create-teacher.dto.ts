import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTeacherDto {
  @ApiPropertyOptional({
    description: 'User id',
    example: '707b48f6-55da-443b-85b8-784b347e0347',
  })
  @IsOptional()
  @IsString({ message: 'Id do usuário deve ser um valor textual.' })
  public readonly userId!: string;

  @ApiProperty({
    description: 'Teacher name',
    example: 'João Carlos da Rocha',
  })
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  @Length(5, 255, {
    message: 'Nome deve estar entre 5 e 255 caracteres.',
  })
  @IsString({ message: 'Nome deve ser um valor textual.' })
  public readonly name!: string;
}
