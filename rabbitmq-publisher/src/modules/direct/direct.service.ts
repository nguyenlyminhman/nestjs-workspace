import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EDirect, EDirectPattern } from 'src/objects/enums/direct.enum';

@Injectable()
export class DirectService {
    // constructor(@Inject('RABBITMQ_SERVICE') private rabbitClient: ClientProxy) {}

    constructor(
        @Inject(EDirect.DIRECT_QUEUE) private rmq: ClientProxy,
    ) { }

    async pushMsgQ1() {
        try {
            return this.rmq.emit(EDirectPattern.DIRECT_PATTERN_01, { msg: 'hello world from ' + EDirectPattern.DIRECT_PATTERN_01 })
        } catch (err) {
            console.log(EDirectPattern.DIRECT_PATTERN_01, err);
            throw new BadRequestException(err);
        }
    }

    async pushMsgQ2() {
        try {
            return this.rmq.emit(EDirectPattern.DIRECT_PATTERN_02, { msg: 'hello world from ' + EDirectPattern.DIRECT_PATTERN_02 })
        } catch (err) {
            console.log('drex_queue_02', err);
            throw new BadRequestException(err);
        }
    }
}
