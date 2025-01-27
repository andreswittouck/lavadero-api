import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { VehicleEntity } from './entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'database',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'lavadero',
      entities: [UserEntity, VehicleEntity],
      synchronize: true, // Solo en desarrollo
    }),
    TypeOrmModule.forFeature([UserEntity, VehicleEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
