import { VehicleService } from './vehicle.service';
import { VehicleEntity } from '../database/entities/vehicle.entity';
export declare class VehicleController {
    private readonly vehicleService;
    constructor(vehicleService: VehicleService);
    create(data: Partial<VehicleEntity>): Promise<VehicleEntity>;
    findAll(): Promise<VehicleEntity[]>;
    findById(id: number): Promise<VehicleEntity>;
    update(id: number, data: Partial<VehicleEntity>): Promise<VehicleEntity>;
    delete(id: number): Promise<void>;
}
