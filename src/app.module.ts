import { Module } from '@nestjs/common';
import { GeneralModule } from './modules/general/general.module';
import { WhatsappModule } from './modules/whatsapp/whatsapp.module';
import { DatabaseModule } from './modules/database/database.module';
import { RedisModule } from 'modules/redis/redis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GeneralModule,
    WhatsappModule,
    DatabaseModule,
    RedisModule,
  ],
})
export class AppModule {}
