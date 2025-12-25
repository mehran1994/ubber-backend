import { OnModuleInit } from "@nestjs/common";
import Redis from 'ioredis';
import { ConfigService } from "@nestjs/config";
export declare class RedisService implements OnModuleInit {
    private readonly configService;
    private logger;
    cacheCli: Redis;
    sessionCli: Redis;
    constructor(configService: ConfigService);
    onModuleInit(): any;
}
