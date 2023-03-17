import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostHandler } from './commands/handlers/create-post.handler';
import { PostController } from './post.controller';
import { PostService } from './service/post.service';

@Module({
  imports: [CqrsModule],
  providers: [PostService, PrismaService, CreatePostHandler],
  controllers: [PostController]
})
export class PostModule {}
