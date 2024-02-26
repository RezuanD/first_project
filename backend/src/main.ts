import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get<string>('PROJECT_NAME'))
    .setDescription(config.get<string>('PROJECT_DESCRIPTION'))
    .setVersion(config.get<string>('PROJECT_VERSION'))
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(Number(config.get<string>('BACKEND_API_PORT')));
}
bootstrap();
