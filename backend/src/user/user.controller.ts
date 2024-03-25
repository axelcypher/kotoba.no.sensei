import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';


@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({ type: User })
  async register(@Body() body: CreateUserDto) {
    const { username, password } = body;
    const userExists = await this.userService.findOne(username);
    if (userExists) {
      throw new BadRequestException('Username already exists');
    }
    await this.userService.create(username, password);
    return { message: 'User created successfully' };
  }

  
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  @ApiCreatedResponse({ type: User })
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }
  /*
  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+username, updateUserDto);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.userService.remove(+username);
  }*/
}
