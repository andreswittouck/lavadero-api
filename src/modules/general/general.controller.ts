import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { Response } from 'express';

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

  @Get('qr')
  async getQrCode(@Res() res: Response) {
    const qrPath = 'static/step-2-qr-detected.png';

    try {
      return res.sendFile(qrPath, { root: process.cwd() });
    } catch (error) {
      return res.status(404).json({ message: 'QR no encontrado.' });
    }
  }
}
