import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { EApiPath } from 'src/objects/enums/api.path';
import { UsersService } from './users.service';
import { Response } from 'src/common/response.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    const data = await this.userService.getUser();
    return new Response(HttpStatus.OK, 'Get users successful', data);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    
    const data = await this.userService.create(createUserDto);

    return new Response(HttpStatus.OK, 'Create user successful', data);
  }

}
