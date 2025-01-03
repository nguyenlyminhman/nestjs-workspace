import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { user } from '@prisma/client';
import { validateHash } from 'src/common/utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async auth(
    authUserDto: AuthUserDto,
  ): Promise<{ token: string; user: user[] }> {
    try {
      const rsUser = await this.userService.findOneByEmail(authUserDto.email);

      if (
        rsUser === null ||
        !validateHash(authUserDto.password, rsUser?.password)
      )
        throw new NotFoundException();

      const { password: _, ...payload } = rsUser;
      return {
        token: this.jwtService.sign({ payload }),
        user: [rsUser],
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async me(id: number): Promise<user> {
    return await this.userService.findOneById(id);
  }
}
