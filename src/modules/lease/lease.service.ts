import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import Big from 'big.js';

import { ExtraService } from '../extra/extra.service';
import { PrismaService } from '../prisma/prisma.service';
import { PropertyService } from '../property/property.service';
import { UserService } from '../user/user.service';
import { UtilityService } from '../utility/utility.service';
import { CreateLeaseDto } from './dtos';

@Injectable()
export class LeaseService {
  private readonly logger = new Logger(LeaseService.name);

  constructor(
    private readonly extraService: ExtraService,
    private readonly prisma: PrismaService,
    private readonly propertyService: PropertyService,
    private readonly userService: UserService,
    private readonly utilityService: UtilityService,
  ) {}

  private model = this.prisma.lease;
  private findFirst = this.model.findFirst;
  private findMany = this.model.findMany;
  private findUnique = this.model.findUnique;

  async findOneOrThrow(id: number) {
    const lease = await this.findUnique({ where: { id } });
    if (!lease) {
      throw new HttpException('Lease does not exist.', HttpStatus.BAD_REQUEST);
    }

    return lease;
  }

  async findAll() {
    return await this.findMany({
      include: {
        property: true,
        tenant: true,
      },
    });
  }

  async findOne(id: number) {
    const lease = await this.findUnique({
      include: {
        leaseExtraCharges: true,
        leaseUtilityCharges: true,
        property: true,
        tenant: true,
      },
      where: { id },
    });
    if (!lease) {
      throw new HttpException('Lease does not exist.', HttpStatus.BAD_REQUEST);
    }

    return lease;
  }

  async create(params: CreateLeaseDto) {
    // validate property
    await this.propertyService.findOneOrThrow(params.propertyId);

    // validate tenant
    await this.userService.findOneOrThrow(params.tenantId);

    const extraChargesAmounts: Big[] = [];
    // validate if extra charges are existing
    if (params.extraCharges.length) {
      for (const { extraId, amount } of params.extraCharges) {
        await this.extraService.findOneOrThrow(extraId);

        extraChargesAmounts.push(new Big(amount));
      }
    }

    const utilityChargesAmounts: Big[] = [];

    // validate if utility charges are existing
    if (params.utilityCharges.length) {
      for (const { utilityId, amount } of params.utilityCharges) {
        await this.utilityService.findOneOrThrow(utilityId);

        utilityChargesAmounts.push(new Big(amount));
      }
    }

    const extraChargesTotal = extraChargesAmounts.reduce(
      (accumulator, currentValue) => accumulator.plus(currentValue),
      new Big(0),
    );
    const utilityChargesTotal = utilityChargesAmounts.reduce(
      (accumulator, currentValue) => accumulator.plus(currentValue),
      new Big(0),
    );
    const rentalAmount = new Big(params.rentalAmount || 0);

    // get total amount
    const total = extraChargesTotal
      .plus(utilityChargesTotal)
      .plus(rentalAmount)
      .toString();

    const leaseData = {
      date: params.date,
      propertyId: params.propertyId,
      rentalAmount: params.rentalAmount,
      tenantId: params.tenantId,
      totalAmount: total,
    };

    return await this.model.create({
      data: {
        ...leaseData,
        leaseExtraCharges: {
          createMany: {
            data: params.extraCharges.map((extraCharge) => ({
              amount: extraCharge.amount,
              extraId: extraCharge.extraId,
            })),
          },
        },
        leaseUtilityCharges: {
          createMany: {
            data: params.utilityCharges.map((utilityCharge) => ({
              amount: utilityCharge.amount,
              utilityId: utilityCharge.utilityId,
            })),
          },
        },
      },
    });
  }

  // async update(id: number, params: UpdateAnnouncementDto) {
  //   await this.findOneOrThrow(id);

  //   return await this.model.update({
  //     data: params,
  //     where: { id },
  //   });
  // }

  async delete(id: number) {
    await this.findOneOrThrow(id);

    return await this.model.delete({ where: { id } });
  }
}
