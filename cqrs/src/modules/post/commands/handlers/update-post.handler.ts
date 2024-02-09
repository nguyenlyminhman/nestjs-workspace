import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../repository/post.repository';
import { UpdatePostCommand } from '../impl';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(readonly postRepository: PostRepository) {}

  async execute(command: UpdatePostCommand): Promise<any> {
    const { postId, updatePostDto } = command;
    // handle logic here

    return await this.postRepository.updateStatus(postId, updatePostDto);
  }
}
