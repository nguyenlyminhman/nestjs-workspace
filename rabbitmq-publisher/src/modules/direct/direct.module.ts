import { Module } from '@nestjs/common';
import { DirectController } from './direct.controller';
import { DirectService } from './direct.service';
import { PublishMessageService } from 'src/rabbitmq/publish-message.service';

@Module({
  controllers: [DirectController],
  providers: [
    DirectService,
    PublishMessageService
  ]
})
export class DirectModule {}
