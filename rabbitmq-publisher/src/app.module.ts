import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { FanoutModule } from './modules/fanout/fanout.module';
import { TopicModule } from './modules/topic/topic.module';
import { DirectModule } from './modules/direct/direct.module';
import { HeadersModule } from './modules/headers/headers.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './shared/app-config.service';
import { RabbitMqModule } from './rabbitmq/rabbitmq.module';
import { SeedingRabbitMqService } from './shared/rabbit-config.service';
import { RmqModule } from './rmq/rmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RabbitMqModule.registerRmq('drex_queue_01', 'drex_queue_01'),
    SharedModule,
    FanoutModule,
    TopicModule,
    DirectModule,
    HeadersModule,
    RmqModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppConfigService,
    // SeedingRabbitMqService
  ],
})
export class AppModule { }
