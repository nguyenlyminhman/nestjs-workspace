import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC } from 'src/object/constant';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = ctx.getContext().req;
    const token = this.getTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const userInfo = await this.jwtService.verifyAsync(token, {
        secret: 'jwtsecret',
      });

      const dbUser = await this.authService.me(userInfo.payload.id);

      if (dbUser === null) {
        throw new UnauthorizedException();
      }
      request['user'] = dbUser;
      // return this.checkPermission(context, request);
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private getTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.get('authorization').split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
