import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../repository/post.repository';
import { DeletePostCommand } from '../impl';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(readonly postRepository: PostRepository) {}

  async execute(command: DeletePostCommand): Promise<any> {
    const { postId } = command;
    // handle logic here

    return await this.postRepository.delete(postId);
  }
}
