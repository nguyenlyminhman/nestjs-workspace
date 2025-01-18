import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('fanout')
export class FanoutController {
    
    @EventPattern('foex_queue')

    getMsg(@Payload() data: any, @Ctx() context: RmqContext) {
      console.log('Fanout Queue Handling 01: ', data);
    }

    @EventPattern('foex_queue')
    getMsgs(@Payload() data: any, @Ctx() context: RmqContext) {
      console.log('Fanout Queue Handling 02: ', data);
    }
}
