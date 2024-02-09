import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../repository/post.repository';
import { GetPostQuery } from '../impl';

@QueryHandler(GetPostQuery)
export class GetPostHandler implements IQueryHandler<GetPostQuery> {
  constructor(private readonly repository: PostRepository) {}

  async execute(query: GetPostQuery) {
    const { postId } = query;
    // handle logic here

    return this.repository.find(postId);
  }
}
