import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMqService implements OnModuleInit, OnModuleDestroy {

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

    const fanoutQueues = ['foex_email_queue', 'fo_log_queue'];
    this.seedingExchangeAndBindingQueue(this.publisherFanoutExc, 'fanout', true, fanoutQueues);
    this.seedingExchangeAndBindingQueue(this.publisherDirectExc, 'direct', true, fanoutQueues);
    this.seedingExchangeAndBindingQueue(this.publisherTopicExc, 'topic', true, fanoutQueues);
    this.seedingExchangeAndBindingQueue(this.publisherHeaderExc, 'headers', true, fanoutQueues);

  }

  // Publish message to the exchange
  async publishMessage(message: string) {
    const exchange = 'inventory_updates';
    this.channel.publish(exchange, '', Buffer.from(message));
    console.log(`Message sent to exchange ${exchange}: ${message}`);
  }

  async seedingExchangeAndBindingQueue(exchangeName: String, exchangeType: String, durable: boolean, queueList: String[] ) {
    await this.channel.assertExchange(exchangeName, exchangeType, { durable: durable });
    
    for (const queue of queueList) {
      await this.channel.assertQueue(queue, { durable: true });
      await this.channel.bindQueue(queue, exchangeName, '');
      console.log(`Queue ${queue} is bound to ${exchangeType} exchange ${this.publisherHeaderExc}`);
    }
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}
