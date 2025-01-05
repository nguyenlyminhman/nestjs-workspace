import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DirectService {
    // constructor(@Inject('RABBITMQ_SERVICE') private rabbitClient: ClientProxy) {}

    constructor(
        @Inject('drex_queue_01') private rabbitMq: ClientProxy,
        @Inject('drex_queue_02') private rmq: ClientProxy,
    ) { }

    async pushMsgQ1() {
        try {
            return this.rabbitMq.emit('drex_queue_01', { msg: 'hello world 1' })
        } catch (err) {
            console.log('----------------------');

            console.log(err);

            throw new BadRequestException(err);
        }
    }

    async pushMsgQ2() {
        try {
            return this.rmq.emit('drex_queue_02', { msg: 'hello world 2' })
        } catch (err) {
            console.log('2 ---------------------- 2');
            console.log(err);
            throw new BadRequestException(err);
        }
    }
}
