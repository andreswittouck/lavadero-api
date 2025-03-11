import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '+541112345678', description: 'User phone number' })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email',
    required: false,
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: [],
    description: 'List of vehicle IDs',
    required: false,
  })
  @IsArray()
  @IsOptional()
  vehicles?: number[];
}
