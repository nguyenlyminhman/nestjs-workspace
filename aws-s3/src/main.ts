import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { info } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  info('App running on port 3000');
  await app.listen(3000);
}

bootstrap();
