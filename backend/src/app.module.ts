import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AdsModule } from './ads/ads.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, AdminModule, AdsModule],
})
export class AppModule {}
