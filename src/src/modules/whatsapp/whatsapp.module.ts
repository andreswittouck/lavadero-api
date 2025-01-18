import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Module({
  providers: [WhatsappService],
  exports: [WhatsappService], // Exportar el servicio
})
export class WhatsappModule {}
