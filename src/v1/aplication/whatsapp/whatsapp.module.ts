import { Module } from '@nestjs/common';
import { RedisModule } from 'v1/aplication/redis/redis.module';
import { WhatsappService } from 'v1/domain/service/whatsapp/whatsapp.service';

@Module({
  imports: [RedisModule],
  providers: [WhatsappService],
  exports: [WhatsappService],
})
export class WhatsappModule {}
