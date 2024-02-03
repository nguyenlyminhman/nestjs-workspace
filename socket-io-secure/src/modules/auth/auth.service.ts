import { Injectable } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async login(authDto: AuthDto) {
    const data = await this.userService.getUserByEmail(authDto.email);
    const { password: _, ...result } = data;

    return {
      token: await this.jwtService.signAsync({ ...result }, { secret: process.env.JWT_SECRETE }),
      user: { ...result },
    };
  }
}
