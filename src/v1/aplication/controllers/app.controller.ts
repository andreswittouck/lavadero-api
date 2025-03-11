import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from 'v1/infrastructure/database/entities/user.entity';
import { VehicleEntity } from 'v1/infrastructure/database/entities/vehicle.entity';
import { WhatsappService } from 'v1/domain/service/whatsapp/whatsapp.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller({ path: '', version: '1' })
export class AppController {
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

  // @Get('qr')
  // async getQrCode(@Res() res: Response) {
  //   const qrPath = 'static/step-2-qr-detected.png';

  //   try {
  //     return res.sendFile(qrPath, { root: process.cwd() });
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (error) {
  //     return res.status(404).json({ message: 'QR no encontrado.' });
  //   }
  // }

  // @ApiOperation({ description: 'Create user' })
  // @ApiTags('Users')
  // @ApiCommonResponses(
  //   HttpStatus.CREATED,
  //   'The request has been successfully created.',
  //   UserEntity,
  // )
  // @ApiConsumes('multipart/form-data')
  // @Post('users')
  // async createUser(@Body() userData: Partial<UserEntity>): Promise<UserEntity> {
  //   const user = this.userRepository.create({
  //     ...userData,
  //     vehicles: userData.vehicles || [],
  //   });
  //   return this.userRepository.save(user);
  // }

  // @ApiOperation({ description: 'Get users' })
  // @ApiTags('Users')
  // @Get('users')
  // async getUsers() {
  //   return this.userRepository.find({ relations: ['vehicles'] });
  // }

  // @ApiOperation({ description: 'Update user' })
  // @ApiTags('Users')
  // @Put('users/:id')
  // async editUser(
  //   @Param('id') id: string,
  //   @Body() userData: Partial<UserEntity>,
  // ): Promise<UserEntity> {
  //   await this.userRepository.update(Number(id), {
  //     ...userData,
  //     vehicles: userData.vehicles || [],
  //   });
  //   return this.userRepository.findOneOrFail({ where: { id: Number(id) } });
  // }

  // @ApiOperation({ description: 'Delete user' })
  // @ApiTags('Users')
  // @Delete('users/:id')
  // async deleteUser(@Param('id') id: string): Promise<void> {
  //   await this.userRepository.delete(Number(id));
  // }

  // @ApiOperation({ description: 'Create vehicle' })
  // @ApiTags('Vehicles')
  // @Post('vehicles')
  // async createVehicle(@Body() vehicleData: Partial<VehicleEntity>) {
  //   const vehicle = this.vehicleRepository.create(vehicleData);
  //   return this.vehicleRepository.save(vehicle);
  // }
}
