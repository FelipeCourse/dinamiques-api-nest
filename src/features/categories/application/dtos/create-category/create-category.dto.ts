import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsHexColor,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'História',
  })
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  @Length(3, 50, {
    message: 'Nome deve estar entre 3 e 50 caracteres.',
  })
  @IsString({ message: 'Nome deve ser um valor textual.' })
  public readonly name!: string;

  @ApiPropertyOptional({
    description: 'Category color',
    example: '#332645',
  })
  @IsOptional()
  @IsHexColor({ message: 'Cor deve ser um hexadecimal válido.' })
  @IsString({ message: 'Cor deve ser um valor textual.' })
  public readonly color!: string;
}
