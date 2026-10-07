import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(identifier: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { OR: [{ username: identifier }, { code: identifier }] },
    });
    if (!user || !user.active || !(await argon2.verify(user.passwordHash, password))) {
      throw new UnauthorizedException('بيانات الدخول غير صحيحة');
    }

    const accessToken = jwt.sign(
      { sub: user.id, role: user.role, machineId: user.machineId },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '15m' },
    );

    return {
      accessToken,
      user: {
        id: user.id,
        code: user.code,
        displayName: user.displayName,
        role: user.role,
        machineId: user.machineId,
        mustChangePwd: user.mustChangePwd,
      },
    };
  }
}
