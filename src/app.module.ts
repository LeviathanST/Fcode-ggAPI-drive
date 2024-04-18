import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth.module';
import { DriveModule } from './modules/drive.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // Makes the ConfigModule global, so you don't need to import it elsewhere
  }), AuthModule, DriveModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
