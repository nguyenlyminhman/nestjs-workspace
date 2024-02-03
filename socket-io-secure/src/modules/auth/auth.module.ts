import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/database/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { WsJwtGuard } from './ws-jwt/ws-jwt.guard';

@Module({
  imports:[
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRETE,
      signOptions: { expiresIn: '3d' },
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    JwtService, 
    UsersService, 
    PrismaService
]
})
export class AuthModule {}
