import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { EventsModule } from './modules/events/events.module';
import { MessagesModule } from './modules/messages/messages.module';
import { APP_GUARD } from '@nestjs/core';
import { WsJwtGuard } from './modules/auth/ws-jwt/ws-jwt.guard';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule, 
    EventsModule, 
    MessagesModule, 
    UsersModule, 
    DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
  ],
})
export class AppModule { }
