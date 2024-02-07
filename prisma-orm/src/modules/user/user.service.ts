import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { user } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';

@Injectable()
export class UserService {
  constructor(readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<user> {
    let rs: any = {}
    try {
      rs = await this.prisma.user.create({
        data: {
          ...createUserDto
        }
      })
    } catch (err) {
      throw new BadRequestException();
    }

    return rs;
  }

  async fetchAll(): Promise<user[]> {
    return await this.prisma.user.findMany();
  }


  async fetchById(id: number): Promise<any[]> {

    return await this.prisma.user.findMany({
      where: {
        id
      },
      include: {
        post: true
      }
    });
  }
}
