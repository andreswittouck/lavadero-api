import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  create(userData: Partial<UserEntity>) {
    const user = this.userRepository.create(userData);
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
}
