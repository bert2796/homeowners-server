import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreatePollDto } from './dtos';

@Injectable()
export class PollService {
  constructor(private readonly prisma: PrismaService) {}

  private model = this.prisma.poll;
  private findFirst = this.model.findFirst;
  private findMany = this.model.findMany;
  private findUnique = this.model.findUnique;

  async findOneOrThrow(id: number) {
    const poll = await this.findUnique({ where: { id } });
    if (!poll) {
      throw new HttpException('Poll does not exist.', HttpStatus.BAD_REQUEST);
    }

    return poll;
  }

  async create(params: CreatePollDto) {
    const { options, ...pollData } = params;

    return await this.model.create({
      data: {
        ...pollData,
        pollChoices: {
          createMany: {
            data: options.map((option) => ({ option })),
          },
        },
      },
    });
  }

  async delete(id: number) {
    await this.findOneOrThrow(id);

    return await this.model.delete({ where: { id } });
  }

  async findAll() {
    return await this.findMany({
      include: { pollChoices: true },
    });
  }

  async findOne(id: number) {
    const poll = await this.findUnique({
      include: { pollChoices: true },
      where: { id },
    });
    if (!poll) {
      throw new HttpException('Poll does not exist.', HttpStatus.BAD_REQUEST);
    }

    return poll;
  }
}
