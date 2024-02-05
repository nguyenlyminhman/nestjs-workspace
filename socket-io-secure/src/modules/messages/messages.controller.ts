import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dtos/message.dto';
import { WsJwtGuard } from '../auth/ws-jwt/ws-jwt.guard';

@Controller('messages')
export class MessagesController {
    constructor(readonly messageService: MessagesService){}

    @Post()
    sendMesage (
        @Body() msg: CreateMessageDto
    ) {      
        return this.messageService.create(msg);
    }

    @Get()
    getMesages () {      
        return this.messageService.fetchAll();
    }
} 
