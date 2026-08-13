import { Controller, Get, Req, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request) {
    // request.user set by JwtStrategy.validate
    const user = (req as any).user;
    return { ok: true, user };
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Req() req: Request, @Body() body: any) {
    const { newPassword } = body;
    const userId = (req as any).user.id;
    const hash = await bcrypt.hash(newPassword, 12);
    const u = await this.usersService.changePassword(userId, hash);
    return { ok: true, user: { id: u.id, username: u.username } };
  }
}
