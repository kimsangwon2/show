import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isAdmin = this.reflector.get<boolean>(
      'isAdmin',
      context.getHandler(),
    );
    if (!isAdmin) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    return request.user && request.user.is_admin;
  }
}
