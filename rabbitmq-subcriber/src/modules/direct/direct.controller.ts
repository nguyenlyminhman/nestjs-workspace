import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EDirectPattern } from 'src/objects/enums/direct.enum';

@Controller('direct')
export class DirectController {

    @EventPattern(EDirectPattern.DIRECT_PATTERN_01)
    getMsg(@Payload() data: any, @Ctx() context: RmqContext) {
      console.log('Direct Queue - ' + EDirectPattern.DIRECT_PATTERN_01, data);
    }

    @EventPattern(EDirectPattern.DIRECT_PATTERN_02)
    getMsg02(@Payload() data: any, @Ctx() context: RmqContext) {
      console.log('Direct Queue - ' + EDirectPattern.DIRECT_PATTERN_02, data);
    }

}
