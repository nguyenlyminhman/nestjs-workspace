import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { EventGateway } from 'src/modules/events/event.getway';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, EventGateway, PrismaService]
})
export class MessagesModule {}
