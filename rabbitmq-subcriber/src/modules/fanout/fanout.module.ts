import { Module } from '@nestjs/common';
import { FanoutController } from './fanout.controller';

@Module({
  controllers: [FanoutController]
})
export class FanoutModule {}
