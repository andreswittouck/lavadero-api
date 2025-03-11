import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '+541112345678',
    description: 'User phone number',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email',
    required: false,
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'List of vehicle IDs',
    required: false,
  })
  @IsArray()
  @IsNumber({}, { each: true }) // Validamos que cada elemento sea un número
  @IsOptional()
  vehicleIds?: number[]; // Cambiamos el nombre para evitar confusión
}
