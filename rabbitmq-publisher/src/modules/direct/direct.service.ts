import { BadRequestException, Injectable } from '@nestjs/common';
import { PublishMessageService } from 'src/rabbitmq/publish-message.service';

@Injectable()
export class DirectService {
    constructor(readonly  rabbitMq: PublishMessageService) { }

    async pushMsg() {
        try {
            return this.rabbitMq.publishDirectMessage('foex_email_queue', 'hello');
        } catch (err) {
            throw new BadRequestException();
        }
    }
}
