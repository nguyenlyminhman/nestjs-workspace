import { Controller, Post } from '@nestjs/common';
import { DirectService } from './direct.service';

@Controller('direct')
export class DirectController {

    constructor(private directService: DirectService) { }

    @Post("/q01")
    async q1() {
        return this.directService.pushMsgQ1();
    }

    @Post("/q02")
    async q2() {
        return this.directService.pushMsgQ2();
    }
}
