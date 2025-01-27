import { Module } from '@nestjs/common';
import { GeneralController } from './general.controller';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'modules/database/entities/user.entity';
import { VehicleEntity } from 'modules/database/entities/vehicle.entity';
import { UserService } from 'modules/user/user.service';
import { VehicleService } from 'modules/vehicle/vehicle.service';
import { UserController } from 'modules/user/user.controller';
import { VehicleController } from 'modules/vehicle/vehicle.controller';
import { RedisModule } from 'modules/redis/redis.module';

@Module({
  imports: [
    WhatsappModule,
    TypeOrmModule.forFeature([UserEntity, VehicleEntity]),
  ],
  controllers: [GeneralController, UserController, VehicleController],
  providers: [VehicleService, UserService],
})
export class GeneralModule {}
