import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EHeader } from 'src/objects/enums/headers.enum';

@Injectable()
export class HeadersService {
    constructor(
        @Inject(EHeader.HEADER_QUEUE) private rmq: ClientProxy,
    ) { }

    async pushMsgPdf() {
        try {
            const headers =
            {
                headers:
                {
                    format: 'pdf',
                    type: 'report'
                }
            }

            return this.rmq.emit({ ...headers }, { msg: 'hello world from Pdf with ' + EHeader.HEADER_QUEUE });
        } catch (err) {
            console.log(EHeader.HEADER_QUEUE, err);
            throw new BadRequestException(err);
        }
    }


    async pushMsgJson() {
        try {
            const headers =
            {
                headers:
                {
                    format: 'json',
                    type: 'report'
                }
            }

            return this.rmq.emit({ ...headers }, { msg: 'hello world from Json with ' + EHeader.HEADER_QUEUE });
        } catch (err) {
            console.log(EHeader.HEADER_QUEUE, err);
            throw new BadRequestException(err);
        }
    }



}
