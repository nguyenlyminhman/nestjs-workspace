import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { user } from '@prisma/client';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query('auth')
  authenticate(
    @Args('authInput')
    authInput: AuthUserDto,
  ): Promise<{ token: string; user: user[] }> {
    return this.authService.auth(authInput);
  }
}
