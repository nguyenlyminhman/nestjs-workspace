import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/message.dto';

@Controller('messages')
export class MessagesController {
    constructor(readonly messageService: MessagesService){}

    @Post()
    sendMesage (
        @Body() msg: CreateMessageDto
    ) {
        return this.messageService.create(msg);
    }
} 
