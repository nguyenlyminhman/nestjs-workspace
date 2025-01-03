import { Controller, Post } from '@nestjs/common';
import { DirectService } from './direct.service';

@Controller('direct')
export class DirectController {

    constructor(private directService: DirectService) { }

    @Post("/yo")
    async abc() {
        return this.directService.pushMsg();
    }

}
