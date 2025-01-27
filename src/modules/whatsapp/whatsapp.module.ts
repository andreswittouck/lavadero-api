import { Module } from '@nestjs/common';
import { RedisModule } from 'modules/redis/redis.module';
import { WhatsappService } from './whatsapp.service';

@Module({
  imports: [RedisModule],
  providers: [WhatsappService],
  exports: [WhatsappService],
})
export class WhatsappModule {}
