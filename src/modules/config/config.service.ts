import { Injectable, Logger } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';
import * as joi from 'joi';

import { Config, SpaceConfig } from '../../commons/types';

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  private readonly config: Config;

  constructor(filePath: string) {
    let file: Buffer;

    try {
      this.logger.log(`Reading file ${filePath}`);

      file = readFileSync(filePath);
    } catch (error) {
      this.logger.error(
        `Can't read the file content/ file does not exist for ${filePath}`,
      );

      throw error;
    }

    const config = parse(file);
    this.config = this.validateInput(config);
  }

  private validateInput(config: Config): Config {
    const configSchema: joi.ObjectSchema = joi.object({
      DATABASE_URL: joi.string().required(),
      HOST: joi.string().required(),
      JWT_ACCESS_TOKEN_EXP: joi.string().required(),
      JWT_ACCESS_TOKEN_SECRET: joi.string().required(),
      JWT_REFRESH_TOKEN_EXP: joi.string().required(),
      JWT_REFRESH_TOKEN_SECRET: joi.string().required(),
      PORT: joi.number().required(),
      SPACE_ACCESS_KEY_ID: joi.string().required(),
      SPACE_ENDPOINT: joi.string().required(),
      SPACE_SECRET_ACCESS_KEY: joi.string().required(),
      // STRIPE_API_KEY: joi.string().required(),
      // STRIPE_WEBHOOK_SECRET: joi.string().required(),
    });

    const { error, value } = configSchema.validate(config);
    if (error) {
      throw new Error(`Config Service Error: ${error.message}`);
    }

    return value;
  }

  get(key: string): string | number | boolean {
    return this.config[String(key)];
  }

  getJwtConfig(): JwtModuleOptions {
    return {
      secret: this.get('JWT_ACCESS_TOKEN_SECRET') as string,
    };
  }

  getSpaceConfig(): SpaceConfig {
    return {
      credentials: {
        accessKeyId: this.get('SPACE_ACCESS_KEY_ID') as string,
        secretAccessKey: this.get('SPACE_SECRET_ACCESS_KEY') as string,
      },
      endpoint: this.get('SPACE_ENDPOINT') as string,
    };
  }

  // getStripeAPIKey(): string {
  //   return this.get('STRIPE_API_KEY') as string;
  // }

  // getStripeWebhookSecret(): string {
  //   return this.get('STRIPE_WEBHOOK_SECRET') as string;
  // }
}
