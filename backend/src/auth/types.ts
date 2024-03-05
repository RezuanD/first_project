import { Request } from 'express';
import { User } from '@/users/user.entity';

export class AccessTokenType {
  access_token: string;
}

export class TokensType extends AccessTokenType {
  refresh_token: string;
}

export class PayloadType {
  username: string;
  sub: string;
}

export class RequestWithUser extends Request {
  user: User;
}
