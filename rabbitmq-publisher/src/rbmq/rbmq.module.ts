import { DynamicModule, Module } from '@nestjs/common';
import { RbmqService } from './rbmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

interface RbmqModuleOptions {
  queueName: string;
}

@Module({
  providers: [RbmqService]
})
export class RbmqModule {
  static register({ queueName }: RbmqModuleOptions): DynamicModule {
    return {
      module: RbmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: queueName,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [`amqps://iyksiimp:DeUCNk-jKZpW-NFtdn0iUNbHG4o9Wa6d@armadillo.rmq.cloudamqp.com/iyksiimp`],
                queue: queueName,
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
