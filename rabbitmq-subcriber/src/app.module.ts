import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RmqService } from './rmq/rmq.service';
import { RmqModule } from './rmq/rmq.module';
import { ConfigModule } from '@nestjs/config';
import { DirectModule } from './modules/direct/direct.module';
import { FanoutModule } from './modules/fanout/fanout.module';
import { TopicModule } from './modules/topic/topic.module';
import { HeadersModule } from './modules/headers/headers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RmqModule,
    DirectModule,
    FanoutModule,
    TopicModule,
    HeadersModule
    ],
  controllers: [AppController],
  providers: [AppService, RmqService],
})
export class AppModule {}
