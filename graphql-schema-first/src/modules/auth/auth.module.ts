import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PrismaService } from 'src/database/prisma.service';
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthService, AuthResolver, UserService, PrismaService],
})
export class AuthModule {}
