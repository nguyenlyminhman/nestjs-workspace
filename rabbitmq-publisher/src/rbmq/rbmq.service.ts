import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RbmqService {
    constructor(private readonly configService: ConfigService) {}

    getOptions(queue: string, noAck = false): RmqOptions {
      return {
        transport: Transport.RMQ,
        options: {
          urls: [`amqps://iyksiimp:DeUCNk-jKZpW-NFtdn0iUNbHG4o9Wa6d@armadillo.rmq.cloudamqp.com/iyksiimp`],
          queue: queue,
          noAck,
          persistent: true,
        },
      };
    }
  
    ack(context: RmqContext) {
      const channel = context.getChannelRef();
      const originalMessage = context.getMessage();
      channel.ack(originalMessage);
    }
}
