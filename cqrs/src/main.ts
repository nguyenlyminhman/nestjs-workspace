import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dbService: PrismaService = app.get(PrismaService);
  await dbService.enableShutdownHooks(app)
  const config = new DocumentBuilder()
  .setTitle('Neko')
  .setDescription('The Neko API description')
  .setVersion('0.1')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('documentation', app, document);
  await app.listen(3000);  
}
bootstrap();
