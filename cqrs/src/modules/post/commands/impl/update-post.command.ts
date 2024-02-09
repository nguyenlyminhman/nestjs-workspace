import { UpdatePostDto } from '../../dtos/update-post.dto';

export class UpdatePostCommand {
  constructor(readonly postId: number, readonly updatePostDto: UpdatePostDto) {}
}
