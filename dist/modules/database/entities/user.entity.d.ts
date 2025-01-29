import { VehicleEntity } from './vehicle.entity';
export declare class UserEntity {
    id: number;
    name: string;
    phone: string;
    email: string;
    createdAt: Date;
    vehicles: VehicleEntity[];
}
