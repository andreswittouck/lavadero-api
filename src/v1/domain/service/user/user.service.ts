import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UpdateUserDto } from 'v1/aplication/dtos/ update-user.dto';
import { CreateUserDto } from 'v1/aplication/dtos/create-user.dto';
import { UserEntity } from 'v1/infrastructure/database/entities/user.entity';
import { VehicleEntity } from 'v1/infrastructure/database/entities/vehicle.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(VehicleEntity)
    private vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async create(userData: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.name = userData.name;
    user.phone = userData.phone;
    user.email = userData.email;

    if (userData.vehicles && userData.vehicles.length > 0) {
      user.vehicles = await this.vehicleRepository.findBy({
        id: In(userData.vehicles),
      });
    } else {
      user.vehicles = [];
    }

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({ relations: ['vehicles'] });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['vehicles'],
    });
  }

  async editUser(id: number, userData: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['vehicles'],
    });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    let vehicles: VehicleEntity[] = user.vehicles;
    if (userData.vehicleIds && userData.vehicleIds.length > 0) {
      vehicles = await this.vehicleRepository.findBy({
        id: In(userData.vehicleIds),
      });
    }

    const { ...updatedData } = userData;

    await this.userRepository.save({
      ...user,
      ...updatedData,
      vehicles,
    });

    return this.findOne(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
