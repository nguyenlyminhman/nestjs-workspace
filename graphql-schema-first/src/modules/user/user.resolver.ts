import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UserService } from './user.service';
import { ParseIntPipe } from '@nestjs/common';
import { User } from 'src/graphql.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query()
  users() {
    return this.userService.findAll();
  }

  @Query()
  user(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') args: CreateUserDto): Promise<User> {
    const createdUser = await this.userService.create(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
