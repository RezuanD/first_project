import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserPayload = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
