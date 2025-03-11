import { WhatsappService } from 'v1/domain/service/whatsapp/whatsapp.service';
import { SendMessageDto } from '../dtos/send-message.dto';
export declare class MessageController {
    private readonly whatsappService;
    constructor(whatsappService: WhatsappService);
    enqueueMessage(data: SendMessageDto): Promise<{
        status: string;
    }>;
    sendMessage(data: SendMessageDto): Promise<string>;
}
