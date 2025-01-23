import { Module } from '@nestjs/common';
import { GeneralController } from './general.controller';
import { WhatsappModule } from '../whatsapp/whatsapp.module';

@Module({
  imports: [WhatsappModule], // Importar el módulo de WhatsApp
  controllers: [GeneralController],
})
export class GeneralModule {}
