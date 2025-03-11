import { Module } from '@nestjs/common';
import { WhatsappModule } from './v1/aplication/whatsapp/whatsapp.module';
import { DatabaseModule } from './v1/infrastructure/database/database.module';
import { RedisModule } from 'v1/aplication/redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'v1/infrastructure/database/entities/user.entity';
import { VehicleEntity } from 'v1/infrastructure/database/entities/vehicle.entity';
import { VehicleService } from 'v1/domain/service/vehicle/vehicle.service';

import { UserService } from 'v1/domain/service/user/user.service';
import { AppController } from 'v1/aplication/controllers/app.controller';
import { UserController } from 'v1/aplication/user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([UserEntity, VehicleEntity]),
    WhatsappModule,
    DatabaseModule,
    RedisModule,
  ],
  controllers: [AppController, UserController],
  providers: [VehicleService, UserService],
})
export class AppModule {}
