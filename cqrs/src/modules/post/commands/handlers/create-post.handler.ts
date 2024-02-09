import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostRepository } from '../../repository/post.repository';
import { CreatePostCommand } from '../impl';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    readonly prismaService: PrismaService,
    readonly postRepository: PostRepository,
  ) {}

  async execute(command: CreatePostCommand): Promise<any> {
    if (command.createPostDto.title == '' || command.createPostDto.status == '')
      throw new HttpException(
        'Title or Status is empty',
        HttpStatus.BAD_REQUEST,
      );
    return await this.postRepository.createPost(command.createPostDto);
  }
}
