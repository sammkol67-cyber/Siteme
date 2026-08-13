import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdDto, UpdateAdDto } from './dto/ads.dto';

@Injectable()
export class AdsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAdDto) {
    return this.prisma.advertisement.create({ data });
  }

  async findAll(options: { location?: string } = {}) {
    const where: any = { isActive: true };
    if (options.location) {
      where.location = options.location;
    }
    // active period check
    where.AND = [
      { OR: [{ startDate: null }, { startDate: { lte: new Date() } }] },
      { OR: [{ endDate: null }, { endDate: { gte: new Date() } }] },
    ];
    return this.prisma.advertisement.findMany({ where });
  }

  async findOne(id: number) {
    return this.prisma.advertisement.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateAdDto) {
    return this.prisma.advertisement.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.advertisement.delete({ where: { id } });
  }
}
