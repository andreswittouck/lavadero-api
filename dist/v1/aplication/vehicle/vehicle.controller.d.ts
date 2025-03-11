import { VehicleService } from 'v1/domain/service/vehicle/vehicle.service';
import { CreateVehicleDto } from '../dtos/create-vehicle.dto';
import { VehicleEntity } from 'v1/infrastructure/database/entities/vehicle.entity';
export declare class VehicleController {
    private readonly vehicleService;
    constructor(vehicleService: VehicleService);
    createVehicle(vehicleData: CreateVehicleDto): Promise<VehicleEntity>;
    getVehicles(): Promise<VehicleEntity[]>;
    editVehicle(id: string, vehicleData: CreateVehicleDto): Promise<VehicleEntity>;
    deleteVehicle(id: string): Promise<void>;
}
