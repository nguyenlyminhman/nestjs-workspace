import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { generateHash } from 'src/common/utils';

@Injectable()
export class UserService {
  constructor(readonly prismaService: PrismaService) { }

  async findAll(): Promise<user[]> {
    let rs: user[];

    try {
      rs = await this.prismaService.user.findMany();
    } catch (err) {
      throw new BadRequestException();
    }

    return rs;
  }

  async findOneById(id: number): Promise<user> {
    let rs: user;

    try {
      rs = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new BadRequestException();
    }

    return rs;
  }

  async create(user: CreateUserDto): Promise<user> {
    let rs: user;
    try {
      rs = await this.prismaService.user.create({
        data: {
          fullname: user.fullname,
          email: user.email,
          permissions: user.permissions,
          password: generateHash(user.password),
        },
      });
    } catch (err) {
      throw new BadRequestException();
    }

    return rs;
  }

  async findOneByEmail(email: string): Promise<user> {
    let rs: user;

    try {
      rs = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
    } catch (err) {
      throw new BadRequestException();
    }

    return rs;
  }
}
