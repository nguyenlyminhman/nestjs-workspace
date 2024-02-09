import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './modules/order/order.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [PrismaModule, OrderModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
