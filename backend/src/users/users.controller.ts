import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async me(@Req() req: Request) {
    // Expect a middleware or guard to set req.user; for scaffold we return placeholder
    return { ok: true, message: 'Implement JWT guard to get current user' };
  }

  @Post('change-password')
  async changePassword(@Body() body: any) {
    const { userId, newPassword } = body;
    const hash = await bcrypt.hash(newPassword, 12);
    const u = await this.usersService.changePassword(userId, hash);
    return { ok: true, user: { id: u.id, username: u.username } };
  }
}
