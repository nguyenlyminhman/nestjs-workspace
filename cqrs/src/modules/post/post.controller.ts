import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  DeletePostCommand,
  UpdatePostCommand,
  CreatePostCommand,
} from './commands/impl';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostEntity } from './entity/post.entity';
import { GetPostsQuery, GetPostQuery } from './queries/impl';

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    description: 'Create new post',
    type: PostEntity,
  })
  async create(@Body() createPostDto: CreatePostDto) {
    return this.commandBus.execute(new CreatePostCommand(createPostDto));
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Update a post',
    type: PostEntity,
  })
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.commandBus.execute(new UpdatePostCommand(+id, updatePostDto));
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get posts',
    type: [PostEntity],
  })
  async getAll() {
    return this.queryBus.execute(new GetPostsQuery());
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get a post',
    type: PostEntity,
  })
  async get(@Param('id') id: string) {
    return this.queryBus.execute(new GetPostQuery(+id));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Delete a post',
    type: PostEntity,
  })
  async delete(@Param('id') id: string) {
    return this.commandBus.execute(new DeletePostCommand(+id));
  }
}
