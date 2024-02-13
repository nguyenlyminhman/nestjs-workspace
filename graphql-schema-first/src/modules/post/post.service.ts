import { BadRequestException, Injectable } from '@nestjs/common';
import { post } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(readonly prismaService: PrismaService) {}

  async findAll(): Promise<post[]> {
    let rs: post[];
    try {
      rs = await this.prismaService.post.findMany({
        include: {
          categories: true,
          user: true,
        },
      });
    } catch (err) {
      throw new BadRequestException();
    }

    return rs;
  }

  async findOneById(id: number): Promise<post> {
    let rs: post;
    try {
      rs = await this.prismaService.post.findUnique({
        where: {
          id,
        },
        include: {
          categories: true,
          user: true,
        },
      });
    } catch (err) {
      throw new BadRequestException();
    }

    return rs;
  }

  async create(post: CreatePostDto): Promise<post> {
    let rs: post;
    try {
      rs = await this.prismaService.post.create({
        data: {
          title: post.title,
          content: post.content,
          categories: {
            connect: [
              {
                id: post.category,
              },
            ],
          },
          user: {
            connect: [
              {
                id: post.author,
              },
            ],
          },
        },
      });
    } catch (err) {
      throw new BadRequestException();
    }

    return rs;
  }
}
