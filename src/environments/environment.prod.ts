import { Logger } from '@nestjs/common';

import { EnvironmentBase } from './environment.base';

const logger = new Logger('EnvironmentProduction');
logger.log('loaded');

export const environment: EnvironmentBase = {
  siteUrl: process.env.SITE_URL as string,
  production: true,
  expressPort: process.env.PORT as string,
  publicRegistration: true,
  cors: {
    credentials: true,
    origin: '*',
  },
  graphql: {
    subscriptions: true,
    sandbox: true,
    introspection: true,
    csrfPrevention: true,
    uploads: {
      maxFileSize: 20_000_000, // 20 MB
      maxFiles: 5,
    },
  },
  jwtOptions: {
    secret: process.env.JWT_PRIVATE_KEY,
    signOptions: {
      algorithm: 'HS256',
      /**
       * The client will exchange the token every 30 minutes during active sessions
       * @see `libs\common\src\lib\environment` for `EnvironmentProd.jwtExchangeInterval`
       */
      expiresIn: 3600, // 1 hour (in seconds)
    },
  },
  expiresInRememberMe: 7_776_000, // 90 days (in seconds)
  mail: {
    // Docs: https://nodemailer.com/smtp/
    transport: {
      host: process.env.SMTP_SERVER,
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    defaults: {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    },
  },
  throttle: [
    {
      limit: 10,
      ttl: 60,
      ignoreUserAgents: [/googlebot/gi, /bingbot/gi],
    },
  ],
  bcryptCost: 12,
  oauth: {
    loginConfirmedURL: `${process.env.SITE_URL}/#/login-confirmed`,
  },
};
