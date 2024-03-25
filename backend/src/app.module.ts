import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgressModule } from './progress/progress.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { LoggerMiddleware } from './logger.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ProgressModule, UserModule, AuthModule, PrismaModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // assuming you want to add some some loggerMiddleware then you can add it here
      .forRoutes('*');
  }
}
