import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthUserDto } from './dtos/auth-user.dto';
import { user } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async auth(
    authUserDto: AuthUserDto,
  ): Promise<{ token: string; user: user[] }> {
    try {
      const rsUser = await this.userService.findOneByEmail(authUserDto.email);

      if (!rsUser || rsUser.password !== authUserDto.password)
        throw new NotFoundException();

      return {
        token: 'abc',
        user: [rsUser],
      };
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
