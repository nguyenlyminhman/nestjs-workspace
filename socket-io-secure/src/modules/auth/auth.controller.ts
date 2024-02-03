import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'src/common/response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    ) {}

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    const userInfo = await this.authService.login(authDto);

    return new Response(HttpStatus.OK, 'Login successfully', userInfo);
  }
}
