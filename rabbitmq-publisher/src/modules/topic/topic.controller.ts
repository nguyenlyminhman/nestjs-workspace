import { Controller, Post } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('topic')
export class TopicController {

    constructor(private topicService: TopicService) { }

    @Post("/user-mail")
    async q1() {
        return this.topicService.pushUserMail();
    }

    @Post("/user-order")
    async q2() {
        return this.topicService.pushUserOrder();
    }

}
