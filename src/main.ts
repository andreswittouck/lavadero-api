import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { configSwagger } from 'v1/domain/swagger';

dotenv.config();

const servers = {
  [process.env.NODE_ENV]: {
    url: process.env.BASE_URL,
    description: process.env.URL_DESCRIPTION || '',
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'error', 'verbose', 'warn'],
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');
  await configSwagger(
    app,
    'Lavadero API',
    'API para la gestión de lavadero',
    servers,
  );

  await app.listen(port, '0.0.0.0');
}
bootstrap();
