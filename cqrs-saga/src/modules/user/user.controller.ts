import { Controller, Get, Injectable, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(
    private userService: UserService
  ){}

  @Get()
  async getUser() {
    return await this.userService.users();
  }
}
