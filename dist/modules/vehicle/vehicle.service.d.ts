import { Repository } from 'typeorm';
import { VehicleEntity } from '../database/entities/vehicle.entity';
export declare class VehicleService {
    private readonly vehicleRepository;
    constructor(vehicleRepository: Repository<VehicleEntity>);
    createVehicle(data: Partial<VehicleEntity>): Promise<VehicleEntity>;
    findAll(): Promise<VehicleEntity[]>;
    findById(id: number): Promise<VehicleEntity>;
    updateVehicle(id: number, data: Partial<VehicleEntity>): Promise<VehicleEntity>;
    deleteVehicle(id: number): Promise<void>;
}
