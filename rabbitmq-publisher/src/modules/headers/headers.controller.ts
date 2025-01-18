import { Controller, Post } from '@nestjs/common';
import { HeadersService } from './headers.service';

@Controller('headers')
export class HeadersController {
    constructor(private headerService: HeadersService) { }

    @Post("/push-pdf")
    async qPdf() {
        return this.headerService.pushMsgPdf();
    }

    
    @Post("/push-json")
    async qJson() {
        return this.headerService.pushMsgJson();
    }
}
