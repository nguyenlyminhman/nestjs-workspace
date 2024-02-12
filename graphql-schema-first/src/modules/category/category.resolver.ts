import { Injectable, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from 'src/graphql.schema';

const pubSub = new PubSub();

@Injectable()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query('categories')
  getAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Query('category')
  getOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<Category> {
    return this.categoryService.findOneById(id);
  }

  @Mutation('createCategory')
  async create(
    @Args('createCategoryInput') args: CreateCategoryDto,
  ): Promise<Category> {
    const categoryCreated = await this.categoryService.create(args);
    pubSub.publish('categoryCreated', { categoryCreated: categoryCreated });
    return categoryCreated;
  }

  @Subscription('categoryCreated')
  categoryCreated() {
    return pubSub.asyncIterator('categoryCreated');
  }
}
