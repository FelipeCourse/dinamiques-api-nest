import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: 'Teacher id',
    example: '707b48f6-55da-443b-85b8-784b347e0347',
  })
  @IsNotEmpty({ message: 'Id do docente é obrigatório.' })
  @IsString({ message: 'Id do docente deve ser um valor textual.' })
  public readonly teacherId!: string;

  @ApiProperty({
    description: 'Category id',
    example: 'f9036fac-e94c-4052-85a1-e54e955171b6',
  })
  @IsNotEmpty({ message: 'Id da categoria é obrigatório.' })
  @IsString({ message: 'Id da categoria deve ser um valor textual.' })
  public readonly categoryId!: string;

  @ApiProperty({
    description: 'Article title',
    example: 'Fórmula de báskara',
  })
  @IsNotEmpty({ message: 'Título é obrigatório.' })
  @Length(3, 150, {
    message: 'Título deve estar entre 3 e 150 caracteres.',
  })
  @IsString({ message: 'Título deve ser um valor textual.' })
  public readonly title!: string;

  @ApiProperty({
    description: 'Article summary',
    example:
      'A fórmula de Bhaskara é um método resolutivo para equações do segundo grau cujo nome homenageia o grande matemático indiano que a demonstrou.',
  })
  @IsNotEmpty({ message: 'Resumo é obrigatório.' })
  @Length(10, 200, {
    message: 'Resumo deve estar entre 10 e 200 caracteres.',
  })
  @IsString({ message: 'Resumo deve ser um valor textual.' })
  public readonly summary!: string;

  @ApiProperty({
    description: 'Article reading time',
    example: 46,
  })
  @IsNotEmpty({ message: 'Tempo de leitura é obrigatório.' })
  @IsPositive({ message: 'Tempo de leitura deve ser maior que 0.' })
  public readonly readingTime!: number;

  @ApiProperty({
    description: 'Article content',
    example:
      '<p>Essa fórmula nada mais é do que um método para encontrar as raízes reais de uma equação do segundo grau fazendo uso apenas de seus coeficientes.</p>',
  })
  @IsNotEmpty({ message: 'Conteúdo é obrigatório.' })
  @IsString({ message: 'Conteúdo deve ser um valor textual.' })
  public readonly content!: string;

  @ApiPropertyOptional({
    description: 'Article highlight image url',
    example:
      'https://www.pexels.com/pt-br/foto/preto-e-branco-p-b-cidade-meio-urbano-21533286/',
  })
  @IsOptional()
  @IsUrl({}, { message: 'URL da imagem deve ser uma URL válida.' })
  @IsString({ message: 'URL da imagem deve ser um valor textual.' })
  public readonly highlightImageUrl!: string;
}
