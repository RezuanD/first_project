import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get('PROJECT_NAME'))
    .setDescription(config.get('PROJECT_DESCRIPTION'))
    .setVersion(config.get('PROJECT_VERSION'))
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(Number(config.get('BACKEND_API_PORT')));
}
bootstrap();
