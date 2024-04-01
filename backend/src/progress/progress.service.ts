import { Body, Injectable, Post } from '@nestjs/common';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto, Vocabulary } from './dto/update-progress.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { JsonArray } from '@prisma/client/runtime/library';

@Injectable()
export class ProgressService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProgressDto: CreateProgressDto) {
    console.log(createProgressDto)
    return 'This action adds a new progress';


    
  }

  findOne(userId: string) {
    const user = this.prisma.progress.findUnique({ where: { userId } });
    return user; 
  }

  
  async update(userId: string, newData: Vocabulary) {
    const progress: any = await this.prisma.progress.findUnique({
      where: { userId },
    });
    const dataArr: Vocabulary[] = progress.data;
    if (progress) {
      // Prüfen, ob das Objekt im Array existiert
      const existingItemIndex = dataArr.findIndex(item => item.kana === newData.kana && item.translated === newData.translated);

      if (existingItemIndex > -1) {
        // Eintrag existiert, also überschreiben
        const updatedData = [...dataArr];
        updatedData[existingItemIndex] = newData;
        const dala: any = updatedData;
        await this.prisma.progress.update({
          where: { userId },
          data: { data: dala },
        });
      } else {
        // Eintrag existiert nicht, also anhängen
        const newDataA: any = newData;
        const dataArrA: any = dataArr;
        await this.prisma.progress.update({
          where: { userId },
          data: { data: [...dataArrA, newDataA] },
        });
      }
    } else {
      // Kein Fortschritt gefunden, erstellen Sie einen neuen Eintrag
      const newDataA: any = newData;
      await this.prisma.progress.create({
        data: {
          userId,
          data: [newDataA], // Initialisieren mit dem neuen Datenobjekt
        },
      });
    }
  }

  remove(userId: string) {
    return `This action removes a #${userId} progress`;
  }
}
