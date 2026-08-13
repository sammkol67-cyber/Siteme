import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Roles('admin', 'superadmin')
  @Get('metrics')
  async metrics() {
    const totalUsers = await this.prisma.user.count();
    const premiumUsers = await this.prisma.subscription.count({ where: { status: 'active' } });
    const totalManga = await this.prisma.manga.count();
    const totalChapters = await this.prisma.chapter.count();
    const totalViewsAgg = await this.prisma.manga.aggregate({ _sum: { views: true } });
    const totalViews = totalViewsAgg._sum.views ?? 0;
    const pendingPayments = await this.prisma.payment.count({ where: { status: 'pending' } });
    const activeAds = await this.prisma.advertisement ? await this.prisma.advertisement.count() : 0;

    return {
      totalUsers,
      premiumUsers,
      totalManga,
      totalChapters,
      totalViews,
      pendingPayments,
      activeAds,
    };
  }
}
