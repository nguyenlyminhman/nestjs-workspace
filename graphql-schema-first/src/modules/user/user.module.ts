import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/database/prisma.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [],
  providers: [UserService, PrismaService, UserResolver],
})
export class UserModule {}
