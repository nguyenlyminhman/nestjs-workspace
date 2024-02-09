import { CreatePostDto } from '../../dtos/create-post.dto';

export class CreatePostCommand {
  constructor(readonly createPostDto: CreatePostDto) {}
}
