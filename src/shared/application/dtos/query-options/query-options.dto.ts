import { IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '../pagination/pagination.dto';

export class QueryOptionsDto extends PaginationDto {
  @IsOptional()
  @IsString({ message: 'Busca deve ser um valor textual.' })
  public readonly query?: string;
}
