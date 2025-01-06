import { Module } from '@nestjs/common';
import { HeadersController } from './headers.controller';

@Module({
  controllers: [HeadersController]
})
export class HeadersModule {}
