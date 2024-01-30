import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Socket is running on port 3003');
  await app.listen(3003);
}
bootstrap();
