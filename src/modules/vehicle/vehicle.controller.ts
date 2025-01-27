import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleEntity } from '../database/entities/vehicle.entity';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(@Body() data: Partial<VehicleEntity>): Promise<VehicleEntity> {
    return this.vehicleService.createVehicle(data);
  }

  @Get()
  async findAll(): Promise<VehicleEntity[]> {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<VehicleEntity> {
    return this.vehicleService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<VehicleEntity>,
  ): Promise<VehicleEntity> {
    return this.vehicleService.updateVehicle(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.vehicleService.deleteVehicle(id);
  }
}
