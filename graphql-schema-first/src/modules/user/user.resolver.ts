import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { user } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PubSub } from 'graphql-subscriptions';
import { Roles } from 'src/object/roles.decorator';
import UserPermissions from 'src/object/enums/user.permissions.enum';
import { User } from 'src/object/decorators/user.decorator';
import { Permission, Public } from 'src/common/utils';

const pubSub = new PubSub();

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query()
  users() {
    return this.userService.findAll();
  }

  @Query()
  @Roles(UserPermissions.READ)
  user(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<user> {
    return this.userService.findOneById(id);
  }

  @Mutation('createUser')
  @Public()
  async create(@Args('createUserInput') args: CreateUserDto): Promise<user> {
    const createdUser = await this.userService.create(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
