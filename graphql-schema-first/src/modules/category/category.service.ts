import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(readonly prismaService: PrismaService) {}

  async findAll(): Promise<category[]> {
    let rs: category[];

    try {
      rs = await this.prismaService.category.findMany();
    } catch (err) {
      throw new BadRequestException();
    }

    return rs;
  }

  async findOneById(id: number): Promise<category> {
    let rs: category;

    try {
      rs = await this.prismaService.category.findUnique({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new BadRequestException();
    }

    return rs;
  }

  async create(category: CreateCategoryDto): Promise<category> {
    let rs: category;

    try {
      rs = await this.prismaService.category.create({
        data: {
          ...category,
        },
      });
    } catch (err) {
      throw new BadRequestException();
    }

    return rs;
  }
}
