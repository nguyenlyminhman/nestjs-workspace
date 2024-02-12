import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/graphql.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOneById(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        ...user,
      },
    });
  }
}
