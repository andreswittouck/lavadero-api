import { Controller, Post, Body } from '@nestjs/common';
import { WhatsappService } from '../whatsapp/whatsapp.service';

@Controller('general')
export class GeneralController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('send-message')
  async sendMessage(
    @Body('service') service: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('message') message: string,
  ) {
    console.log('Service:', service); // Diagnóstico
    console.log('PhoneNumber:', phoneNumber); // Diagnóstico
    console.log('Message:', message); // Diagnóstico

    if (service === 'whatsapp') {
      return this.whatsappService.sendMessage(phoneNumber, message);
    }
    return { error: 'Service not supported' };
  }
}
