import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VERSION_1, EApiPath } from 'objects/enums';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ResponseOK } from 'objects/dtos/response-ok.dto';


@Controller({
  path: EApiPath.USER,
  version: VERSION_1,
})
@ApiTags(EApiPath.USER)
export class UserController {

  constructor(private userService: UserService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiCreatedResponse({
    description: 'fetch all users',
  })
  async fetchAll() {
    const data = await this.userService.fetchAll();

    return new ResponseOK(HttpStatus.OK, 'OK', data);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiCreatedResponse({
    description: 'fetch all users',
  })
  async fetchById(
    @Param('id', ParseIntPipe) id: number
  ) {
    const data = await this.userService.fetchById(id);

    return new ResponseOK(HttpStatus.OK, 'OK', data);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Done' })
  @ApiCreatedResponse({
    description: 'Create a new user',
  })
  async creatUser(
    @Body() createUserDto: CreateUserDto
  ) {
    const data = await this.userService.create(createUserDto);

    return new ResponseOK(HttpStatus.OK, 'OK', data);
  }
}
