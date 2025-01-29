import { WhatsappService } from '../whatsapp/whatsapp.service';
import { Response } from 'express';
import { UserEntity } from 'modules/database/entities/user.entity';
import { Repository } from 'typeorm';
import { VehicleEntity } from 'modules/database/entities/vehicle.entity';
export declare class GeneralController {
    private readonly whatsappService;
    private userRepository;
    private vehicleRepository;
    constructor(whatsappService: WhatsappService, userRepository: Repository<UserEntity>, vehicleRepository: Repository<VehicleEntity>);
    enqueueMessage(phoneNumber: string, message: string): Promise<{
        status: string;
    }>;
    sendMessage(phoneNumber: string, message: string): Promise<string>;
    getQrCode(res: Response): Promise<void | Response<any, Record<string, any>>>;
    createUser(userData: Partial<UserEntity>): Promise<UserEntity>;
    getUsers(): Promise<UserEntity[]>;
    createVehicle(vehicleData: Partial<VehicleEntity>): Promise<VehicleEntity>;
    editUser(id: string, userData: Partial<UserEntity>): Promise<UserEntity>;
    deleteUser(id: string): Promise<void>;
}
