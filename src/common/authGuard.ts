import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthRoleType } from './auth.role';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<AuthRoleType>('role', context.getHandler());
    const ctx = GqlExecutionContext.create(context).getContext();
    const xJwt = ctx?.req?.headers['x-jwt'];

    if (role === 'Allowed') {
      return true;
    }

    if (xJwt) {
      try {
        const decoded = this.jwtService.verifyJwtToken(xJwt);
        if (typeof decoded === 'object' && decoded['id']) {
          const userId = decoded['id'];
          ctx['userId'] = userId;
          return true;
        }
      } catch (error) {
        console.log(`Error on APP_GUARD : ${error}`);
        return false;
      }
    }
    return false;
  }
}
