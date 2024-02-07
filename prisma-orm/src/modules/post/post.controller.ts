import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EApiPath, VERSION_1 } from 'objects/enums';
import { PostService } from './post.service';
import { ResponseOK } from 'objects/dtos/response-ok.dto';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller({
  path: EApiPath.POST,
  version: VERSION_1,
})
@ApiTags(EApiPath.POST)
export class PostController {

  constructor(private postService: PostService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiOkResponse({
    description: 'fetch all post',
  })
  async fetchAll() {
    const data = await this.postService.fetchAll();
    return new ResponseOK(HttpStatus.OK, 'OK', data);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiCreatedResponse({
    description: 'Create a new post',
  })
  async creatPost(
    @Body() createPostDto: CreatePostDto
  ) {
    const data = await this.postService.create(createPostDto);
    return new ResponseOK(HttpStatus.OK, 'OK', data);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiOkResponse({
    description: 'Get post detail',
  })
  async getPost(
    @Param('id', ParseIntPipe) id: number
  ) {    
    const data = await this.postService.fetchById(id);
    return new ResponseOK(HttpStatus.OK, 'OK', data);
  }
}
