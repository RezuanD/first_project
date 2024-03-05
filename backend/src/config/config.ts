import { jwtConfig } from '@/config/jwt.config';
import { CookieConfig } from '@/config/cookie.config';
import { mediaConfig } from '@/config/media.config';

export const Config = {
  JWT: jwtConfig,
  CookieOptions: CookieConfig,
  Media: mediaConfig,
};
