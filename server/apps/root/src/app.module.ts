import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SwaggerModule } from '@nestjs/swagger';
import { AppController } from './app.controller';

@Module({
  imports: [AuthModule, UserModule, SwaggerModule],
  controllers: [AppController],
})
export class AppModule {}
