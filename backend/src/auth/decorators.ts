import { ExecutionContext, createParamDecorator } from '@nestjs/common';

function extractUserFromRequest(ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
}

export const UserPayload = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => extractUserFromRequest(ctx),
);

export const UserLocal = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => extractUserFromRequest(ctx),
);
