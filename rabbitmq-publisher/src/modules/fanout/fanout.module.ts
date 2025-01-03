import { Module } from '@nestjs/common';
import { FanoutController } from './fanout.controller';
import { FanoutService } from './fanout.service';

@Module({
  controllers: [FanoutController],
  providers: [FanoutService]
})
export class FanoutModule {}
