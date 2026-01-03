import { RedisService } from "../databases/redis/redis.service";
import { ServiceClientContextDto, ServiceResponseData } from "../services/dto";
import { PostgresService } from "../databases/postgres/postgres.service";
export declare class DriversService {
    private readonly pg;
    private readonly redis;
    private static readonly role;
    constructor(pg: PostgresService, redis: RedisService);
    requestOtp({ query }: ServiceClientContextDto): Promise<ServiceResponseData>;
    verifyOtp({ query }: ServiceClientContextDto): Promise<ServiceResponseData>;
}
