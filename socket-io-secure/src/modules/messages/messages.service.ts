import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dtos/message.dto';
import { EventGateway } from 'src/modules/events/event.getway';
import { Message } from '../../objects/entities/message.entity';

@Injectable()
export class MessagesService {
    constructor(private eventGateway: EventGateway){}
    create(createMessageDto: CreateMessageDto) {
        const mess = <Message>createMessageDto;

        this.eventGateway.sendMessage(mess);
        return createMessageDto;
        // insert db in here
    }
}
