import { UserService } from './user.service';
import { UserEntity } from 'modules/database/entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(userData: Partial<UserEntity>): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    editUser(id: string, userData: Partial<UserEntity>): Promise<UserEntity>;
    deleteUser(id: string): Promise<void>;
}
