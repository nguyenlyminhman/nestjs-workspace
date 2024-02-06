import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, type NestExpressApplication } from '@nestjs/platform-express';
import { SharedModule } from './shared/shared.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './shared/app-config.service';
import helmet from 'helmet';
import morgan from 'morgan';
import { SwaggerConfig } from './objects/configs/swagger';



async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true }
  );

  const serverConfig = app.select(SharedModule).get(AppConfigService);
  const { port } = serverConfig.serverPort;

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use(helmet());
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('combined'));
  app.enableVersioning();
  // Microservice config here
  
  // Setup swagger
  if (serverConfig.swaggerEnabled) {
    SwaggerConfig(app);
  }
  // Set global prefix for endpoint


  await app.listen(port);

  return app;
}

void bootstrap();
