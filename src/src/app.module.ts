import { Module } from '@nestjs/common';
import { GeneralModule } from './modules/general/general.module';
import { WhatsappModule } from './modules/whatsapp/whatsapp.module';

@Module({
  imports: [GeneralModule, WhatsappModule],
})
export class AppModule {}
