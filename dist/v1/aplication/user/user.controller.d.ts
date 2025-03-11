import { UserService } from 'v1/domain/service/user/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/ update-user.dto';
import { UserEntity } from 'v1/infrastructure/database/entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(userData: CreateUserDto): Promise<UserEntity>;
    getUsers(): Promise<UserEntity[]>;
    editUser(id: string, userData: UpdateUserDto): Promise<UserEntity>;
    deleteUser(id: string): Promise<void>;
}
