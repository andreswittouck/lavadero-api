import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Toyota', description: 'Car make' })
  @IsString()
  make: string;

  @ApiProperty({ example: 'Corolla', description: 'Car model' })
  @IsString()
  model: string;

  @ApiProperty({ example: 2020, description: 'Year of manufacture' })
  @IsInt()
  year: number;

  @ApiProperty({ example: 1, description: 'Owner ID' })
  @IsInt()
  ownerId: number;
}
