import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dtos/message.dto';
import { EventGateway } from 'src/modules/events/event.getway';
import { Message } from '../../objects/entities/message.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private eventGateway: EventGateway,
    private prisma: PrismaService
  ) { }
  async create(createMessageDto: CreateMessageDto) {
    const mess = <Message>createMessageDto;

    const result = await this.prisma.message.create({
      data: {
        message: createMessageDto.message,
        authorId: 1, // Sender id is here
        createdAt: new Date(),
        updatedAt: new Date()
      },
    });
    if (result)
      this.eventGateway.sendMessage(mess);

    return createMessageDto;
  }

  async fetchAll () {
    return await this.prisma.message.findMany();
  }
}
