import { Controller, Post } from '@nestjs/common';
import { FanoutService } from './fanout.service';

@Controller('fanout')
export class FanoutController {
    constructor(private fanoutService: FanoutService) { }

    @Post("/push")
    async q1() {
        return this.fanoutService.pushMsgQ1();
    }
}
