import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(userData: Partial<UserEntity>): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    editUser(id: number, userData: Partial<UserEntity>): Promise<UserEntity>;
    deleteUser(id: number): Promise<void>;
}
