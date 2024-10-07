import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

import { CreateArticleDto } from '../create-article/create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @ApiPropertyOptional({
    description: 'Article publication status',
    example: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Publicado deve ser um valor verdadeiro ou falso.' })
  public readonly isPublished?: boolean;
}
