import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

import { CreateCategoryDto } from '../create-category/create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional({
    description: 'Category status',
    example: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Ativo deve ser um valor verdadeiro ou falso.' })
  public readonly isActive?: boolean;
}
