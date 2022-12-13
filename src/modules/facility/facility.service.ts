import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Facility } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { SpaceDriveService } from '../space-drive/space-drive.service';
import { CreateFacilityDto, UpdateFacilityDto } from './dtos';

@Injectable()
export class FacilityService {
  private readonly logger = new Logger(FacilityService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly spaceDriveService: SpaceDriveService,
  ) {}

  private model = this.prisma.facility;
  private findFirst = this.model.findFirst;
  private findMany = this.model.findMany;
  private findUnique = this.model.findUnique;

  private async uploadImages(
    facility: Facility,
    images: Express.Multer.File[],
  ) {
    let currentCount = 0;
    for (const image of images) {
      currentCount++;

      try {
        // upload image
        const fileExtension = image?.mimetype?.split('/')?.[1] || 'jpeg';
        const uploadedImage = await this.spaceDriveService.uploadFile({
          bucket: `homeowners/facility_images/${facility.id}`,
          file: image,
          name: `${facility.id}-${currentCount}.${fileExtension}`,
        });

        // create facility image
        await this.prisma.facilityImage.create({
          data: {
            facilityId: facility.id,
            url: uploadedImage.Location,
          },
        });
      } catch (error) {
        this.logger.error('Failed to upload facility image');
        this.logger.error(error);
      }
    }
  }

  async findOneOrThrow(id: number) {
    const facility = await this.findOne(id);
    if (!facility) {
      throw new HttpException(
        'Facility does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return facility;
  }

  async create(params: CreateFacilityDto, images: Express.Multer.File[]) {
    // create facility
    const facility = await this.model.create({
      data: {
        description: params.description,
        name: params.name,
      },
    });

    // create facility payment setting
    await this.prisma.facilityPaymentSetting.create({
      data: {
        amount: params.amount,
        downPayment: params.downPayment,
        facilityId: facility.id,
        type: params.type,
      },
    });

    if (images?.length) {
      await this.uploadImages(facility, images);
    }

    return facility;
  }

  async update(
    id: number,
    params: UpdateFacilityDto,
    images: Express.Multer.File[],
  ) {
    const facility = await this.findOneOrThrow(id);

    if (images?.length) {
      await this.uploadImages(facility, images);
    }

    return await this.model.update({
      data: params,
      where: { id },
    });
  }

  async delete(id: number) {
    await this.findOneOrThrow(id);

    return await this.model.delete({ where: { id } });
  }

  async findAll() {
    return await this.findMany({
      include: { facilityImages: true, facilityPaymentSetting: true },
    });
  }

  async findOne(id: number) {
    const facility = await this.findUnique({
      include: { facilityImages: true, facilityPaymentSetting: true },
      where: { id },
    });
    if (!facility) {
      throw new HttpException(
        'Facility does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return facility;
  }
}
