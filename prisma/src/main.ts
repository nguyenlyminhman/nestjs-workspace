import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dbService: PrismaService = app.get(PrismaService);
  await dbService.enableShutdownHooks(app)
  await app.listen(3000);  
}
bootstrap();
