import { RedisService } from "../databases/redis/redis.service";
import { ServiceClientContextDto, ServiceResponseData } from "../services/dto";
export declare class DriversService {
    private readonly redis;
    private static readonly role;
    constructor(redis: RedisService);
    requestOtp({ query }: ServiceClientContextDto): Promise<ServiceResponseData>;
}
