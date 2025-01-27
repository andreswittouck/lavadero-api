import { Module } from '@nestjs/common';
import { GeneralModule } from './modules/general/general.module';
import { WhatsappModule } from './modules/whatsapp/whatsapp.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [GeneralModule, WhatsappModule, DatabaseModule],
})
export class AppModule {}
