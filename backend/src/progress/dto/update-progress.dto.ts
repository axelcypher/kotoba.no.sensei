import { PartialType } from '@nestjs/swagger';
import { CreateProgressDto } from './create-progress.dto';
//src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { JsonArray, JsonValue } from '@prisma/client/runtime/library';

export class UpdateProgressDto extends PartialType(CreateProgressDto) {

    @IsNotEmpty()   
    data: JsonArray;

}

export class Vocabulary {

    @IsNotEmpty()   
    kana: string;
    @IsNotEmpty()   
    translated: string;


}
