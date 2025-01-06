import { Module } from '@nestjs/common';
import { FanoutController } from './fanout.controller';
import { FanoutService } from './fanout.service';
import { RbmqModule } from 'src/rbmq/rbmq.module';
import { EFanout } from 'src/objects/enums/fanout.enum';

@Module({
  imports: [
    RbmqModule.register({ queueName: EFanout.FANOUT_QUEUE }),
  ],
  controllers: [FanoutController],
  providers: [FanoutService]
})
export class FanoutModule {}
