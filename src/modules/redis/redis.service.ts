import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor(private configService: ConfigService) {
    this.redisClient = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
      retryStrategy: (times) => {
        return Math.min(times * 100, 3000); // Reintenta hasta 3 segundos
      },
    });
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redisClient.set(key, value, 'EX', ttl);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async pushToQueue(queueName: string, message: string): Promise<void> {
    await this.redisClient.lpush(queueName, message);
  }

  async popFromQueue(queueName: string): Promise<string | null> {
    return this.redisClient.rpop(queueName);
  }
}
