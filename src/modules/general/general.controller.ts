import { Controller, Post, Body, Get, Res } from '@nestjs/common';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'modules/database/entities/user.entity';
import { Repository } from 'typeorm';
import { VehicleEntity } from 'modules/database/entities/vehicle.entity';

@Controller('general')
export class GeneralController {
  constructor(
    private readonly whatsappService: WhatsappService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(VehicleEntity)
    private vehicleRepository: Repository<VehicleEntity>,
  ) {}

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

  @Post('users')
  async createUser(@Body() userData: Partial<UserEntity>) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  @Get('users')
  async getUsers() {
    return this.userRepository.find({ relations: ['vehicles'] });
  }

  @Post('vehicles')
  async createVehicle(@Body() vehicleData: Partial<VehicleEntity>) {
    const vehicle = this.vehicleRepository.create(vehicleData);
    return this.vehicleRepository.save(vehicle);
  }
}
