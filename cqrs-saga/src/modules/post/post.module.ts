import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostHandler } from './commands/handlers/create-post.handler';
import { DeletePostHandler } from './commands/handlers/delete-post.handler';
import { UpdatePostHandler } from './commands/handlers/update-post.handler';
import { PostController } from './post.controller';
import { GetPostHandler } from './queries/handlers/get-post.handler';
import { GetPostsHandler } from './queries/handlers/get-posts.handler';
import { PostRepository } from './repository/post.repository';
import { PostService } from './service/post.service';

const commandHandlers = [CreatePostHandler, UpdatePostHandler, DeletePostHandler];
const queryHandlers = [GetPostHandler, GetPostsHandler];
@Module({
  imports: [CqrsModule],
  providers: [
    PostService,
    PrismaService,
    PostRepository,
    ...commandHandlers,
    ...queryHandlers,
  ],
  controllers: [PostController],
})
export class PostModule {}
