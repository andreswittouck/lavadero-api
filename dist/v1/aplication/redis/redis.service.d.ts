import { ConfigService } from '@nestjs/config';
export declare class RedisService {
    private configService;
    private readonly redisClient;
    constructor(configService: ConfigService);
    set(key: string, value: string, ttl?: number): Promise<void>;
    get(key: string): Promise<string | null>;
    pushToQueue(queueName: string, message: string): Promise<void>;
    popFromQueue(queueName: string): Promise<string | null>;
}
