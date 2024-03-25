//src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from './../user/user.service';

const jwtSecret = process.env.JWT_SECRET

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
    console.log(ExtractJwt.fromAuthHeaderAsBearerToken())
    console.log(jwtSecret)
  }

  async validate(payload: { userId: string }) {
    const user = await this.usersService.findOneById(payload.userId);
    console.log(user)

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}