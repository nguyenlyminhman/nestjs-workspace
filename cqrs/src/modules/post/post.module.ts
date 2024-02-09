import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommandHandlers } from './commands/handlers';
import { PostController } from './post.controller';
import { QueryHandlers } from './queries/handlers';
import { PostRepository } from './repository/post.repository';
import { PostService } from './service/post.service';

@Module({
  imports: [CqrsModule],
  providers: [
    PostService,
    PrismaService,
    PostRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  controllers: [PostController],
})
export class PostModule {}
