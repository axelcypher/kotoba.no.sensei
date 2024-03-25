import { Body, Injectable, Post } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProgressDto: CreateProgressDto) {
    return 'This action adds a new progress';
  }

  findOne(username: string) {
    const user = this.prisma.user.findUnique({ where: { username } });
    console.log(user)
    //return this.prisma.user.findUnique({ where: { userId } });
    return `This action returns a #${username} progress`;
  }

  update(username: string, updateProgressDto: UpdateProgressDto) {
    return `This action updates a #${username} progress`;
  }

  remove(username: string) {
    return `This action removes a #${username} progress`;
  }
}
