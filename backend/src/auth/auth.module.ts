import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';
import { RefreshJwtStrategy } from './jwt-refresh.strategy';
//import { UserModule } from './../user/user.module';

const jwtSecret = process.env.JWT_SECRET 

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '15m' },
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, RefreshJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
 