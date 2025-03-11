import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { RedisService } from 'v1/aplication/redis/redis.service';
export declare class WhatsappService implements OnModuleInit, OnModuleDestroy {
    private readonly redisService;
    private readonly queueName;
    private readonly apiUrl;
    constructor(redisService: RedisService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    sendMessage(phoneNumber: string, message: string): Promise<string>;
    enqueueMessage(phoneNumber: string, message: string): Promise<void>;
    processMessageQueue(): Promise<void>;
}
