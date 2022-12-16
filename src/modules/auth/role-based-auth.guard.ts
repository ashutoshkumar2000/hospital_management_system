import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'enums/roles.enum';
import { Request } from 'express';

@Injectable()
export class RoleBasedAuth extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    if (
      request.headers.role !== (user.role || Role.Admin) ||
      request.headers.email !== user.email
    ) {
      throw new ForbiddenException();
    }
    return user;
  }
}
