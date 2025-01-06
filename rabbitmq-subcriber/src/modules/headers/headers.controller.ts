import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('headers')
export class HeadersController {

    @EventPattern('hdex_queue_01')
    getMsg(@Payload() data: any, @Ctx() context: RmqContext) {
      console.log('Headers Queue: ', data);
    }
    
}
