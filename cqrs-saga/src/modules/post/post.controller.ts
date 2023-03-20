import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiFoundResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { CreatePostCommand } from './commands/create-post.command';
import { DeletePostCommand } from './commands/delete-post.command';
import { UpdatePostCommand } from './commands/update-post.command';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostEntity } from './entity/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly commandBus: CommandBus) {}

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
