import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { VehicleEntity } from './entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, VehicleEntity],
      synchronize: true, // Solo en desarrollo
      retryAttempts: 10, // Incrementa el número de reintentos
      retryDelay: 5000, // Aumenta el tiempo entre reintentos (en milisegundos)
    }),
    TypeOrmModule.forFeature([UserEntity, VehicleEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
