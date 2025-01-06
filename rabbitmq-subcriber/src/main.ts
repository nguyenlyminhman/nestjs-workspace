import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { RmqService } from './rmq/rmq.service';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true }
  );


  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use(helmet());
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(morgan('combined'));
  app.enableVersioning();
  // Microservice config here

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('drex_queue'));
  app.connectMicroservice(rmqService.getOptions('foex_queue'));
  app.connectMicroservice(rmqService.getOptions('hdex_queue'));
  app.connectMicroservice(rmqService.getOptions('tpex_queue'));

  await app.startAllMicroservices();
  await app.listen(3001);
  
  return app;
}

void bootstrap();
