import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostEntity } from '../entity/post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';

@Injectable()
export class PostRepository {
  constructor(readonly prismaService: PrismaService) {}

  async createPost(postData: CreatePostDto): Promise<PostEntity> {
    return await this.prismaService.post.create({ data: postData });
  }

  async updateStatus(id: number, postData: UpdatePostDto): Promise<PostEntity> {
    return await this.prismaService.post.update({
      where: { id: id },
      data: { ...postData },
    });
  }

  async delete(id: number): Promise<PostEntity> {
    return await this.prismaService.post.delete({
      where: { id: id },
    });
  }

  async find(id: number): Promise<PostEntity> {
    return await this.prismaService.post.findUnique({
      where: { id: id },
    });
  }

  async findAll(): Promise<PostEntity[]> {
    return await this.prismaService.post.findMany();
  }
}
