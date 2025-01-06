import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('fanout')
export class FanoutController {
    
    @EventPattern('foex_queue_01')
    getMsg(@Payload() data: any, @Ctx() context: RmqContext) {
      console.log('Fanout Queue: ', data);
    }

}
