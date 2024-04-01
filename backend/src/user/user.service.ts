import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor(private prisma: PrismaService) {
    this.users = [];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  findOneById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
   }

  async create(username: string, pass: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(pass, 10);
    this.users.push({ username, password: hashedPassword });
    console.log(
      `User is created with username ${username} and encrypted password ${hashedPassword}`,
    );
  }
  
  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }
  /*
  remove(id: number) {
    return `This action removes a #${id} user`;
  }*/
}
