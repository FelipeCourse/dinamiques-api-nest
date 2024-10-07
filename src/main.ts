import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { EnvironmentsService } from '@/shared/infrastructure/environments/services/environments.service';

import { AppModule } from './app.module';
import {
  AllExceptionFilter,
  ConflictErrorFilter,
  InvalidCredentialsErrorFilter,
  NotFoundErrorFilter,
} from './shared/infrastructure/http/filters';
import { ResponseInterceptor } from './shared/infrastructure/http/interceptors';

async function bootstrap() {
  const appPrefix = 'api/v1';
  const app = (await NestFactory.create(AppModule)).setGlobalPrefix(appPrefix);
  const logger = new Logger('Main');
  const environmentsService = app.get(EnvironmentsService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Dinamiques')
    .setDescription('API to manage resources for an academic blog')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(`${appPrefix}/docs`, app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(
    new AllExceptionFilter(),
    new NotFoundErrorFilter(),
    new ConflictErrorFilter(),
    new InvalidCredentialsErrorFilter(),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(environmentsService.getAppPort());
  logger.log(`Server is running on PORT:${environmentsService.getAppPort()}`);
}
bootstrap();
