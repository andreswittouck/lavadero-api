import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({
    example: '+541112345678',
    description: 'Recipient phone number',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: 'Your car is ready for pickup!',
    description: 'Message to send',
  })
  @IsString()
  message: string;
}
