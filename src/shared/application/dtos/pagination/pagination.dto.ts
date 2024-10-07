import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt({ message: 'Página deve ser um valor inteiro.' })
  @Type(() => Number)
  public readonly page?: number = 1;

  @IsOptional()
  @IsInt({ message: 'Limite deve ser um valor inteiro.' })
  @Type(() => Number)
  public readonly limit?: number = 10;
}
