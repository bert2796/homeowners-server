import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';

import { AuthorizeGuard } from './commons/guards/authorize.guard';
import { AnnouncementModule } from './modules/announcement/announcement.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { PropertyModule } from './modules/property/property.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        logger: pino({
          level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
          redact: ['req.headers.authorization', 'req.body.password'],
          transport: {
            options: {
              colorize: true,
              singleLine: true,
            },
            target:
              process.env.NODE_ENV !== 'production' ? 'pino-pretty' : undefined,
          },
        }),
      },
    }),
    ConfigModule,
    AnnouncementModule,
    AuthModule,
    UserModule,
    PropertyModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizeGuard,
    },
  ],
})
export class AppModule {}
