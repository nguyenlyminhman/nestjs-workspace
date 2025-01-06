import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { RbmqModule } from 'src/rbmq/rbmq.module';
import { ETopic } from 'src/objects/enums/topic.enum';

@Module({
  imports: [
    RbmqModule.register({ queueName: ETopic.TOPIC_QUEUE }),
  ],
  controllers: [TopicController],
  providers: [
    TopicService,
  ]
})
export class TopicModule { }
