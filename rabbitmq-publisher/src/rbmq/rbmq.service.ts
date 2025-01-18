import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RbmqService {
    constructor(private readonly configService: ConfigService) {}

  
    getOptions(queue: string, noAck = false): RmqOptions {
      const RABBIT_URL = this.configService.get<string>('RABBIT_URL');
      return {
        transport: Transport.RMQ,
        options: {
          urls: [`${RABBIT_URL}`],
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
