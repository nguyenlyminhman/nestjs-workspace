import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { MessagesModule } from './messages/messages.module';
import { APP_GUARD } from '@nestjs/core';
import { WsJwtGuard } from './auth/ws-jwt/ws-jwt.guard';

@Module({
  imports: [AuthModule, EventsModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: WsJwtGuard
  }],
})
export class AppModule {}
