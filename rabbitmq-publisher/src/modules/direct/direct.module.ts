import { Module } from '@nestjs/common';
import { DirectController } from './direct.controller';
import { DirectService } from './direct.service';
import { RabbitMqService } from 'src/rabbitmq/rabbitmq.service';
import { RmqModule } from 'src/rmq/rmq.module';
import { RabbitMqModule } from 'src/rabbitmq/rabbitmq.module';

@Module({
  imports: [    
    RmqModule.register({ name: 'drex_queue_02'}),
    RabbitMqModule.registerRmq('drex_queue_01', 'drex_queue_01'),
  ],
  controllers: [DirectController],
  providers: [
    DirectService,
    RabbitMqService
  ]
})
export class DirectModule {}
