import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PostRepository } from '../../repository/post.repository';
import { GetPostsQuery } from '../impl';

@QueryHandler(GetPostsQuery)
export class GetPostsHandler implements IQueryHandler<GetPostsQuery> {
  constructor(private readonly repository: PostRepository) {}

  async execute(query: GetPostsQuery) {
    // handle logic here

    return this.repository.findAll();
  }
}
