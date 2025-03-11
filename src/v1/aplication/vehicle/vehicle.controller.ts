import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { VehicleService } from 'v1/domain/service/vehicle/vehicle.service';
import { CreateVehicleDto } from '../dtos/create-vehicle.dto';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { ApiCommonResponses } from 'v1/utils/decorators/api-responses.decorator';
import { VehicleEntity } from 'v1/infrastructure/database/entities/vehicle.entity';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiCommonResponses(
    HttpStatus.CREATED,
    'Vehicle successfully created',
    VehicleEntity,
  )
  @ApiConsumes('application/json')
  @Post()
  createVehicle(@Body() vehicleData: CreateVehicleDto) {
    return this.vehicleService.createVehicle(vehicleData);
  }

  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiCommonResponses(HttpStatus.OK, 'List of vehicles', [VehicleEntity])
  @Get()
  getVehicles() {
    return this.vehicleService.findAll();
  }

  @ApiOperation({ summary: 'Update vehicle' })
  @ApiCommonResponses(
    HttpStatus.OK,
    'Vehicle updated successfully',
    VehicleEntity,
  )
  @Put(':id')
  editVehicle(@Param('id') id: string, @Body() vehicleData: CreateVehicleDto) {
    return this.vehicleService.updateVehicle(Number(id), vehicleData);
  }

  @ApiOperation({ summary: 'Delete vehicle' })
  @ApiCommonResponses(HttpStatus.NO_CONTENT, 'Vehicle deleted successfully')
  @Delete(':id')
  deleteVehicle(@Param('id') id: string) {
    return this.vehicleService.deleteVehicle(Number(id));
  }
}
