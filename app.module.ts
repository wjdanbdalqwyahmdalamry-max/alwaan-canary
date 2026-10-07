import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
})
export class AppModule {}
