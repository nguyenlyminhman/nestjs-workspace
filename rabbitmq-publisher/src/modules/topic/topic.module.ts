import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { PublishMessageService } from 'src/rabbitmq/publish-message.service';

@Module({
  imports: [],
  controllers: [TopicController],
  providers: [
    TopicService,
    PublishMessageService
  ]
})
export class TopicModule { }
