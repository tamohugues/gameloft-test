import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'body-parser';
import { LoggingInterceptor, FullExceptionFilter } from './common';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  app.enableCors();

  app.use(helmet());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new FullExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('chat API')
    .setDescription('Gameloft test chat app')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(app, options, {
      ignoreGlobalPrefix: true,
      deepScanRoutes: true,
    });
  
    SwaggerModule.setup('api', app, document, {
      customCss: ` 
      #swagger-ui div.topbar img {
        display : none;
      }
      #swagger-ui div.topbar a::after {
        content : 'Chat API'
      }`,
    });
  
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
  
    await app.listen(port);
}
bootstrap();
