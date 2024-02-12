import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from 'src/graphql.schema';

@Injectable()
export class CategoryService {
  constructor(readonly prismaService: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return this.prismaService.category.findMany();
  }

  async findOneById(id: number): Promise<Category> {
    return this.prismaService.category.findUnique({
      where: {
        id,
      },
    });
  }

  async create(category: CreateCategoryDto): Promise<Category> {
    return this.prismaService.category.create({
      data: {
        ...category,
      },
    });
  }
}
