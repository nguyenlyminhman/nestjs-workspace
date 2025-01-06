import { Module } from '@nestjs/common';
import { DirectController } from './direct.controller';

@Module({
  controllers: [DirectController]
})
export class DirectModule {}
