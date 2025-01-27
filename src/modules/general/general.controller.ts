import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Post('queue-message')
  async enqueueMessage(
    @Body('phoneNumber') phoneNumber: string,
    @Body('message') message: string,
  ) {
    await this.whatsappService.enqueueMessage(phoneNumber, message);
    return { status: 'Mensaje encolado' };
  }

  @Post('send-message')
  async sendMessage(
    @Body('phoneNumber') phoneNumber: string,
    @Body('message') message: string,
  ) {
    return this.whatsappService.sendMessage(phoneNumber, message);
  }

  @Get('qr')
  async getQrCode(@Res() res: Response) {
    const qrPath = 'static/step-2-qr-detected.png';

    try {
      return res.sendFile(qrPath, { root: process.cwd() });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(404).json({ message: 'QR no encontrado.' });
    }
  }

  @Post('users')
  async createUser(@Body() userData: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.userRepository.create({
      ...userData,
      vehicles: userData.vehicles || [],
    });
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

  @Put('users/:id')
  async editUser(
    @Param('id') id: string,
    @Body() userData: Partial<UserEntity>,
  ): Promise<UserEntity> {
    await this.userRepository.update(Number(id), {
      ...userData,
      vehicles: userData.vehicles || [],
    });
    return this.userRepository.findOneOrFail({ where: { id: Number(id) } });
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userRepository.delete(Number(id));
  }
}
