import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

import { CreateUserDto } from '../create-user/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'User status',
    example: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Ativo deve ser um valor verdadeiro ou falso.' })
  public readonly isActive?: boolean;
}
