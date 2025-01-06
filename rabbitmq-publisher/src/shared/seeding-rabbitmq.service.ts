import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';
import { EDirect } from 'src/objects/enums/direct.enum';
import { EFanout } from 'src/objects/enums/fanout.enum';
import { EHeader } from 'src/objects/enums/headers.enum';
import { ETopic } from 'src/objects/enums/topic.enum';

@Injectable()
export class SeedingRabbitMqService implements OnModuleInit, OnModuleDestroy {

  private connection = null;
  private channel = null;
  
  private publisherFanoutExc = 'publisher.fanout';
  private publisherTopicExc = 'publisher.topic';
  private publisherHeaderExc = 'publisher.headers';
  private publisherDirectExc = 'publisher.direct';
  
  async onModuleInit() {    

    // Connect to RabbitMQ
    this.connection = await amqp.connect('amqps://iyksiimp:DeUCNk-jKZpW-NFtdn0iUNbHG4o9Wa6d@armadillo.rmq.cloudamqp.com/iyksiimp');
    this.channel = await this.connection.createChannel();

    const fanoutQueues  = [EFanout.FANOUT_QUEUE];
    const directQueues  = [EDirect.DIRECT_QUEUE];
    const topicQueues   = [ETopic.TOPIC_QUEUE];
    const headersQueues = [EHeader.HEADER_QUEUE];

    this.seedingExchangeAndBindingQueue(this.publisherFanoutExc, 'fanout', true, fanoutQueues);
    this.seedingExchangeAndBindingQueue(this.publisherDirectExc, 'direct', true, directQueues);
    this.seedingExchangeAndBindingQueue(this.publisherTopicExc, 'topic', true, topicQueues);
    this.seedingExchangeAndBindingQueue(this.publisherHeaderExc, 'headers', true, headersQueues);

  }

  async seedingExchangeAndBindingQueue(exchangeName: string, exchangeType: string, durable: boolean, queueList: string[] ) {
    await this.channel.assertExchange(exchangeName, exchangeType, { durable: durable });
    
    for (const queue of queueList) {
      await this.channel.assertQueue(queue, { durable: true });
      await this.channel.bindQueue(queue, exchangeName, '');
      console.log(`Queue ${queue} is bound to ${exchangeType} exchange ${exchangeName}`);
    }
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}
