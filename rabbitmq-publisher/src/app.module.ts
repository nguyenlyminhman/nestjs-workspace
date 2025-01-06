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
import { RbmqModule } from './rbmq/rbmq.module';
import { SeedingRabbitMqService } from './shared/seeding-rabbitmq.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SharedModule,
    FanoutModule,
    TopicModule,
    DirectModule,
    HeadersModule,
    RbmqModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppConfigService,
    // SeedingRabbitMqService
  ],
})
export class AppModule { }
