import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { PostService } from './service/post.service';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService : PostService,
        private readonly commandBus : CommandBus,
    ){}
}
