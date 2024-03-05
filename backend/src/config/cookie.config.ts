import { cookieOptions } from '@/config/cookie.options';

export const CookieConfig = {
  maxAge: cookieOptions.cookieExpirationInSeconds,
  httpOnly: true,
  secure: process.env?.NODE_ENV !== 'dev',
  sameSite: false,
  path: '/',
};
