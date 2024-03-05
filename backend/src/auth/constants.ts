export const jwtConstants = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
};

export const cookieConstants = {
  cookieExpirationInSeconds: +process.env.COOKIE_EXPIRATION,
};
