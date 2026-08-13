import { Body, Controller, Get, Post, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto, UpdateAdDto } from './dto/ads.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}

  // Public: get ads by location
  @Get()
  async list(@Query('location') location?: string) {
    return this.adsService.findAll({ location });
  }

  // Admin CRUD
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Post('admin')
  async create(@Body() dto: CreateAdDto) {
    return this.adsService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Get('admin')
  async adminList() {
    return this.adsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Get('admin/:id')
  async get(@Param('id') id: string) {
    return this.adsService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Put('admin/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateAdDto) {
    return this.adsService.update(Number(id), dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'superadmin')
  @Delete('admin/:id')
  async remove(@Param('id') id: string) {
    return this.adsService.remove(Number(id));
  }
}
