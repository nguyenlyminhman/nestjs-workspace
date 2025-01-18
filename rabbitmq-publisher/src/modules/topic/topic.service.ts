import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ETopic, ETopicPattern } from 'src/objects/enums/topic.enum';

@Injectable()
export class TopicService {

    constructor(
        @Inject(ETopic.TOPIC_QUEUE) private rmq: ClientProxy,
    ) { }

    async pushUserMail() {
        try {
            return this.rmq.emit(ETopicPattern.USER_EMAIL, { msg: 'Thank you for signing up! with queue' + ETopic.TOPIC_QUEUE} )
        } catch (err) {
            console.log(ETopic.TOPIC_QUEUE, err);
            throw new BadRequestException(err);
        }
    }

    async pushUserOrder() {
        try {
            return this.rmq.emit(ETopicPattern.USER_ORDER, { msg: 'Thank you for ordering! with queue ' + ETopic.TOPIC_QUEUE })
        } catch (err) {
            console.log('drex_queue_02', err);
            throw new BadRequestException(err);
        }
    }


}
