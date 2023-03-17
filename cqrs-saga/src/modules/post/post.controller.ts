import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiFoundResponse } from '@nestjs/swagger';
import { CreatePostCommand } from './commands/create-post.command';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostEntity } from './entity/post.entity';
import { PostService } from './service/post.service';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService : PostService,
        private readonly commandBus : CommandBus,
    ){}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiFoundResponse({
      description: 'create order',
      type: PostEntity,
    })
    async create(@Body() createPostDto: CreatePostDto){      
        return this.commandBus.execute(new CreatePostCommand(createPostDto))
    }
}
