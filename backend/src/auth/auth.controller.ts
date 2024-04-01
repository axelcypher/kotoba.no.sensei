import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Req,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

import { Auth } from './entities/auth.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  

  @Post('login')
  @ApiOkResponse({ type: Auth })
  async login(@Body() { username, password }: LoginDto) {
    const vara = await this.authService.login(username, password).then( data => {
      return data
    });
    return vara;
  }

  @Post('refresh')
  @ApiOkResponse({ type: Auth })
  async updateRefreshToken(@Body() { userId, refreshToken }: RefreshDto) {
    return this.authService.updateRefreshToken(userId, refreshToken);
  }
  
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout("req.user['sub']");
  }


}
