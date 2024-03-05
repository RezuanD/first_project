import { cookieConstants } from '@/auth/constants';

export const cookieOptions = {
  maxAge: cookieConstants.cookieExpirationInSeconds,
  httpOnly: true,
  secure: process.env?.NODE_ENV !== 'dev',
  sameSite: false,
  path: '/',
};
