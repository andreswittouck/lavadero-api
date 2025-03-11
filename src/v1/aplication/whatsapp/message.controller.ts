import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { WhatsappService } from 'v1/domain/service/whatsapp/whatsapp.service';
import { SendMessageDto } from '../dtos/send-message.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiCommonResponses } from 'v1/utils/decorators/api-responses.decorator';

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @ApiOperation({ summary: 'Queue a WhatsApp message' })
  @ApiCommonResponses(HttpStatus.ACCEPTED, 'Message queued successfully')
  @Post('queue')
  async enqueueMessage(@Body() data: SendMessageDto) {
    await this.whatsappService.enqueueMessage(data.phoneNumber, data.message);
    return { status: 'Mensaje encolado' };
  }

  @ApiOperation({ summary: 'Send a WhatsApp message' })
  @ApiCommonResponses(HttpStatus.OK, 'Message sent successfully')
  @Post('send')
  async sendMessage(@Body() data: SendMessageDto) {
    return this.whatsappService.sendMessage(data.phoneNumber, data.message);
  }
}
