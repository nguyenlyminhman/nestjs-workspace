import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('headers')
export class HeadersController {

    @EventPattern({ headers: { format: 'pdf', type: 'report' } })
    getMsg(@Payload() data: any, @Ctx() context: RmqContext) {
      console.log('Headers PDF Queue : ', data);
    }
    
    @EventPattern({ headers: { format: 'json', type: 'report' } })
    getMsgs(@Payload() data: any, @Ctx() context: RmqContext) {
      console.log('Headers Json Queue: ', data);
    }
    
}
