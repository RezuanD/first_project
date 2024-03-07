export class AccessTokenType {
  access_token: string;
}

export class TokensType extends AccessTokenType {
  refresh_token: string;
}

export class PayloadType {
  username: string;
  userId: string;
}
