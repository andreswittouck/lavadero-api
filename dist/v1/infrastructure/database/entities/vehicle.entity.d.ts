import { UserEntity } from './user.entity';
export declare class VehicleEntity {
    id: number;
    make: string;
    model: string;
    year: number;
    owner: UserEntity;
}
