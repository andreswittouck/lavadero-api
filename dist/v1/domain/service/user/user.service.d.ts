import { Repository } from 'typeorm';
import { UpdateUserDto } from 'v1/aplication/dtos/ update-user.dto';
import { CreateUserDto } from 'v1/aplication/dtos/create-user.dto';
import { UserEntity } from 'v1/infrastructure/database/entities/user.entity';
import { VehicleEntity } from 'v1/infrastructure/database/entities/vehicle.entity';
export declare class UserService {
    private userRepository;
    private vehicleRepository;
    constructor(userRepository: Repository<UserEntity>, vehicleRepository: Repository<VehicleEntity>);
    create(userData: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    editUser(id: number, userData: UpdateUserDto): Promise<UserEntity>;
    deleteUser(id: number): Promise<void>;
}
