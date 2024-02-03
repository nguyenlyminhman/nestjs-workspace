import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { EventGateway } from 'src/modules/events/event.getway';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, EventGateway]
})
export class MessagesModule {}
