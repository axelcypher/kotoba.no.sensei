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
import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Progress } from './entities/progress.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('progress')
@ApiTags('User Progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  create(@Body() createProgressDto: CreateProgressDto, @Param('userId') userId: string) {

    return this.progressService.create(createProgressDto);
  }
  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('userId') userId: string) {
    
    const resp = this.progressService.findOne(userId);
    return resp; 
  }
 
  @Patch(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  update(@Param('userId') userId: string, @Body() updateProgressDto: UpdateProgressDto) {
    console.log("Updating User Progres...")
    const vocab:any = updateProgressDto.data;
    return this.progressService.update(userId, vocab);
  }

  @Delete(':userId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiCreatedResponse({ type: Progress })
  remove(@Param('userId') userId: string) {
    return this.progressService.remove(userId);
  }
}
