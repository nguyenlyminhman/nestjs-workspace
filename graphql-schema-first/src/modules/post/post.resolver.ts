import { Injectable, ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreatePostDto } from './dto/create-post.dto';
import { post } from '@prisma/client';
import { PostService } from './post.service';

const pubSub = new PubSub();

@Injectable()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query('posts')
  async getAll() {
    return await this.postService.findAll();
  }

  @Query('post')
  getOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<post> {
    return this.postService.findOneById(id);
  }

  @Mutation('createPost')
  async create(@Args('createPostInput') args: CreatePostDto): Promise<post> {
    const postCreated = await this.postService.create(args);
    pubSub.publish('postCreated', { postCreated: postCreated });
    return postCreated;
  }

  @Subscription('postCreated')
  postCreated() {
    return pubSub.asyncIterator('postCreated');
  }
}
