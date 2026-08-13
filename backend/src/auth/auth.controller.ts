import { Body, Controller, Post, Res, HttpCode, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private prisma: PrismaService) {}

  @Post('register')
  async register(@Body() body: any) {
    const { username, email, password } = body;
    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existing) throw new BadRequestException('User already exists');
    const hash = await bcrypt.hash(password, 12);
    const defaultRole = await this.prisma.role.findUnique({ where: { name: 'user' } });
    const user = await this.prisma.user.create({
      data: { username, email, password: hash, roleId: defaultRole?.id || 1 },
      select: { id: true, username: true, email: true, forcePasswordChange: true },
    });
    return { user };
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(dto.identifier, dto.password);
    if (!user) throw new BadRequestException('Invalid credentials');
    const tokens = await this.authService.login(user);
    res.cookie('jid', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    // Return access token and force password change flag
    return { accessToken: tokens.accessToken, forcePasswordChange: user.forcePasswordChange || false };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jid', { path: '/' });
    return { ok: true };
  }
}
