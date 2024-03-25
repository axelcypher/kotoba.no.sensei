import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  @MinLength(5)
  username: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  @MinLength(5)
  password: string;
}
