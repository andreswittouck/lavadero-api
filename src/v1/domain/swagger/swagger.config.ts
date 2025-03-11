import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

interface serverConfigValue {
  url: string;
  description: string;
}
interface serverConfig {
  [key: string]: serverConfigValue;
}

export const countryHeader = {
  'x-country': {
    description: 'Country code for the request',
    schema: {
      type: 'string',
      example: 'ar',
    },
  },
};

export async function configSwagger(
  app: INestApplication,
  title: string,
  description: string,
  servers: serverConfig,
) {
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion('1.0')
      .addBearerAuth();

    if (servers) {
      const serverConfig = servers[process.env.NODE_ENV];
      if (serverConfig) {
        config.addServer(serverConfig.url, serverConfig.description);
      }
    }

    const setup = config.build();

    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    };
    const document = SwaggerModule.createDocument(app, setup, options);
    SwaggerModule.setup('docs', app, document);
  }
}
