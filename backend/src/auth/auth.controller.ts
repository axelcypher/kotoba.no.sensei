import {
  Controller,
  Post,
  Body,
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
  login(@Body() { username, password }: LoginDto) {
    console.log(username, password)
    return this.authService.login(username, password);
  }

}
