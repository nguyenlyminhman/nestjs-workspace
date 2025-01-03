import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { FanoutModule } from './modules/fanout/fanout.module';
import { TopicModule } from './modules/topic/topic.module';
import { DirectModule } from './modules/direct/direct.module';
import { HeadersModule } from './modules/headers/headers.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './shared/app-config.service';
import { RabbitMqService } from './shared/rabbit-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // ClientsModule.register([
    //   {
    //     name: 'RABBITMQ_SERVICE',  // Unique identifier for the client
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqps://iyksiimp:DeUCNk-jKZpW-NFtdn0iUNbHG4o9Wa6d@armadillo.rmq.cloudamqp.com/iyksiimp'],  // RabbitMQ URL
    //       queue: 'default_queue',  // Default queue name (can be overridden)
    //       queueOptions: {
    //         durable: false,  // Whether the queue should survive restarts
    //       }
    //     },
    //   },
    // ]),
    SharedModule,
    FanoutModule, 
    TopicModule, 
    DirectModule, 
    HeadersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppConfigService,
    RabbitMqService
  ],
})
export class AppModule {}
