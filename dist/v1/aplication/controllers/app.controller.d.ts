import { UserEntity } from 'v1/infrastructure/database/entities/user.entity';
import { VehicleEntity } from 'v1/infrastructure/database/entities/vehicle.entity';
import { WhatsappService } from 'v1/domain/service/whatsapp/whatsapp.service';
import { Repository } from 'typeorm';
export declare class AppController {
    private readonly whatsappService;
    private userRepository;
    private vehicleRepository;
    constructor(whatsappService: WhatsappService, userRepository: Repository<UserEntity>, vehicleRepository: Repository<VehicleEntity>);
    enqueueMessage(phoneNumber: string, message: string): Promise<{
        status: string;
    }>;
    sendMessage(phoneNumber: string, message: string): Promise<string>;
}
