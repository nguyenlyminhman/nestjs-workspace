import { BadRequestException, Injectable } from '@nestjs/common';
import { post } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostService {
  constructor(readonly prisma: PrismaService) { }

  async create(createPostDto: CreatePostDto): Promise<post> {
    let rs: any = {}
    try {
      rs = await this.prisma.post.create({
        data: {
          title: createPostDto.title,
          author_id: createPostDto.author_id,
          categories: {
            connect: [{ id: createPostDto.category_id }]
          }
        }
      })
    } catch (err) {
      throw new BadRequestException();
    }

    return rs;
  }

  async fetchAll(): Promise<post[]> {
    return await this.prisma.post.findMany();
  }

  async fetchById(id: number): Promise<any> {
    return await this.prisma.post.findMany({
      where: {
        id,
      },
      include: {
        categories: true,
      }
    })
  }
}
