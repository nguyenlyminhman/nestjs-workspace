import { Global, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';


@Injectable()
@Global()
export class PublishMessageService implements OnModuleInit {

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
    
  }

  // Publish message to the exchange
  async publishDirectMessage(toQueue: string, message: string) {
    console.log(toQueue, message);
    const rs = this.channel.publish(this.publisherDirectExc, toQueue, Buffer.from(message));
    console.log(rs);
    
    return rs
  }

  async publishTopicMessage(toQueue: string, message: string) {
    this.channel.publish(this.publisherTopicExc, toQueue, Buffer.from(message));
    console.log(`Message sent to exchange ${this.publisherTopicExc}: ${message}`);
  }

  async publishHeaderMessage(toQueue: string, message: string) {
    this.channel.publish(this.publisherHeaderExc, toQueue, Buffer.from(message));
    console.log(`Message sent to exchange ${this.publisherHeaderExc}: ${message}`);
  }

  async publishFanoutMessage(toQueue: string, message: string) {
    this.channel.publish(this.publisherFanoutExc, toQueue, Buffer.from(message));
    console.log(`Message sent to exchange ${this.publisherFanoutExc}: ${message}`);
  }

  
}
