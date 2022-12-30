import { Injectable } from '@nestjs/common';

import { Period } from '../../commons/constants';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  private getPeriodicSQLFormat(period: Period) {
    switch (period) {
      case 'weekly':
        return '%X-%V';
      case 'monthly':
        return '%Y-%m';
      case 'yearly':
        return '%Y';
    }
  }

  private async generatePeriodicityPaymentsReport(
    table: string,
    period: Period,
  ) {
    const format = this.getPeriodicSQLFormat(period);

    const query = `
      SELECT
        DATE_FORMAT(createdAt, '${format}') as date,
        SUM(amount) as total
      FROM ${table}
      WHERE status = 'Approved'
      GROUP BY date
      ORDER BY date
    `;

    return await this.prisma.$queryRawUnsafe(query);
  }

  private async generatePeriodicityChargesReport(
    table: string,
    id: number,
    period: Period,
  ) {
    const format = this.getPeriodicSQLFormat(period);
    const idToUse = table === 'LeaseExtraCharge' ? 'extraId' : 'utilityId';

    const query = `
      SELECT
        DATE_FORMAT(c.createdAt, '${format}') as date,
        SUM(c.amount) as total
      FROM LeasePayment lp
      JOIN ${table} c
      ON lp.id = c.leaseId
      WHERE lp.status = 'Approved' AND c.${idToUse}
      GROUP BY date
      ORDER BY date
    `;

    return await this.prisma.$queryRawUnsafe(query);
  }

  async getPeriodicityUtilityCharges(utilityId: number, period: Period) {
    return await this.generatePeriodicityChargesReport(
      'LeaseUtilityCharge',
      utilityId,
      period,
    );
  }

  async getPeriodicityExtraCharges(extraId: number, period: Period) {
    return await this.generatePeriodicityChargesReport(
      'LeaseExtraCharge',
      extraId,
      period,
    );
  }

  async getPeriodicityLeasePayments(period: Period) {
    return await this.generatePeriodicityPaymentsReport('LeasePayment', period);
  }

  async getPeriodicityReservationPayment(period: Period) {
    return await this.generatePeriodicityPaymentsReport(
      'ReservationPayment',
      period,
    );
  }
}
