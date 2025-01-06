import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('topic')
export class TopicController {

    @EventPattern('tpex_queue_01')
    getMsg(@Payload() data: any, @Ctx() context: RmqContext) {
      console.log('Topic Queue: ', data);
    }

}
