import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { SpaceObject } from '../../commons/types';
import { ConfigService } from '../config/config.service';

@Injectable()
export class SpaceDriveService {
  private readonly logger = new Logger(SpaceDriveService.name);
  private s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    if (!this.s3) {
      this.initS3();
    }
  }

  private initS3() {
    const spaceConfig = this.configService.getSpaceConfig();

    try {
      this.s3 = new AWS.S3({
        credentials: new AWS.Credentials(spaceConfig.credentials),
        endpoint: new AWS.Endpoint(spaceConfig.endpoint),
      });

      this.logger.log('Space Drive S3 initialized successfully');
    } catch (error) {
      this.logger.log('Space Drive S3 failed to initialized');

      throw error;
    }
  }

  async uploadFile(params: {
    bucket: string;
    file: Express.Multer.File;
    name: string;
  }): Promise<SpaceObject> {
    const { bucket, file, name } = params;
    try {
      return await this.s3
        .upload({
          ACL: 'public-read',
          Body: file.buffer,
          Bucket: bucket,
          ContentType: file.mimetype,
          Key: name,
        })
        .promise();
    } catch (error) {
      this.logger.error(
        `DO Space failed to upload file = ${error.message}, bucket: ${bucket}, name: ${name}`,
      );
      this.logger.error(error.stack);

      throw new HttpException('Failed to upload file', HttpStatus.BAD_REQUEST);
    }
  }
}
