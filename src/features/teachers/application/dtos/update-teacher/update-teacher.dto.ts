import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

import { CreateTeacherDto } from '../create-teacher/create-teacher.dto';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
  @ApiPropertyOptional({
    description: 'Teacher status',
    example: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Ativo deve ser um valor verdadeiro ou falso.' })
  public readonly isActive?: boolean;
}
