import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from '../database/entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async createVehicle(data: Partial<VehicleEntity>): Promise<VehicleEntity> {
    const vehicle = this.vehicleRepository.create(data);
    return this.vehicleRepository.save(vehicle);
  }

  async findAll(): Promise<VehicleEntity[]> {
    return this.vehicleRepository.find({ relations: ['owner'] });
  }

  async findById(id: number): Promise<VehicleEntity> {
    return this.vehicleRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
  }

  async updateVehicle(
    id: number,
    data: Partial<VehicleEntity>,
  ): Promise<VehicleEntity> {
    await this.vehicleRepository.update(id, data);
    return this.findById(id);
  }

  async deleteVehicle(id: number): Promise<void> {
    await this.vehicleRepository.delete(id);
  }
}
