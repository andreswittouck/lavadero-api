import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
export declare class WhatsappService implements OnModuleInit, OnModuleDestroy {
    private readonly redisService;
    private client;
    private readonly queueName;
    constructor(redisService: RedisService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    sendMessage(phoneNumber: string, message: string): Promise<string>;
    enqueueMessage(phoneNumber: string, message: string): Promise<void>;
    processMessageQueue(): Promise<void>;
    private saveQrCode;
}
