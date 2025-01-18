import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('topic')
export class TopicController {

    @MessagePattern('user.register.email') // Lắng nghe các routing key khớp với user.*.email
    getMsgEmail(@Payload() data: any, @Ctx() context: RmqContext) {
      console.log('User Email: ', data);
    }

    @EventPattern('user.order.success')
    getMsgOrder(@Payload() data: any, @Ctx() context: RmqContext) {
      console.log('User Order: ', data);
    }

}
