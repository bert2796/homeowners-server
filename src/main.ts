import { HttpStatus, Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { ValidationPipe } from './commons/pipes/validation.pipe';
import { ConfigService } from './modules/config/config.service';
import { PrismaService } from './modules/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
    rawBody: true,
  });
  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);
  const logger = new NestLogger('main');

  const PORT = (configService.get('PORT') as number) || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      whitelist: true,
    }),
  );
  app.useLogger(app.get(Logger));
  // app.useGlobalInterceptors(new LoggerErrorInterceptor());c

  await prismaService.enableShutdownHooks(app);

  await app.listen(PORT, '0.0.0.0', () =>
    logger.log(`app is now running in port ${PORT}`),
  );
}
bootstrap();
