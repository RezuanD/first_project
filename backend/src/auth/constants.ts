export const jwtConstants = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  EXPIRATION_15_DAYS_CONSTANT: '15d',
  EXPIRATION_1_HOUR_CONSTANT: '3600s',
};

export const cookieConstants = {
  cookieExpirationInSeconds: 864000,
};
