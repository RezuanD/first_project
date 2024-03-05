import { jwtConfig } from './jwt.config';
import { CookieConfig } from './cookie.config';
import { mediaConfig } from './media.config';

export const Config = {
  JWT: jwtConfig,
  CookieOptions: CookieConfig,
  Media: mediaConfig,
};
