import { BadRequestException, Injectable } from '@nestjs/common';
import { category } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(readonly prisma: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<category> {
    let rs: any = {}
    try {
      rs = await this.prisma.category.create({
        data: {
          ...createCategoryDto
        }
      })
    } catch (err) {
      throw new BadRequestException();
    }

    return rs;
  }

  async fetchAll(): Promise<category[]> {
    return await this.prisma.category.findMany();
  }
}
