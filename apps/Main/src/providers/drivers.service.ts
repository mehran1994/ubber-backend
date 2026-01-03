import {BadRequestException, HttpStatus, Injectable} from "@nestjs/common";
import {RedisService} from "../databases/redis/redis.service";
import {ServiceClientContextDto, ServiceResponseData, SrvError} from "../services/dto";
import {PostgresService} from "../databases/postgres/postgres.service";
import {TokenService} from "../_utils/handlers/token.service";

@Injectable()
export class DriversService {
    private static readonly role = "driver";
    constructor(
        private readonly pg: PostgresService,
        private readonly redis: RedisService,
        private readonly tokenService: TokenService,
    ) {}

    async requestOtp({ query }: ServiceClientContextDto): Promise<ServiceResponseData> {
        const { phone } = query;
        const key = `otp:${DriversService.role}:${phone}`;
        const existing = await this.redis.cacheCli.get(key);
        if(existing) throw new SrvError(HttpStatus.BAD_REQUEST, 'OTP already sent');

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const ttl = 2 * 60;
        await this.redis.cacheCli.set(key, otp, 'EX', ttl);

        return {
            message: 'OTP send successfully!',
            data: {
                success: true,
                phone,
                otp,
                expiresIn: ttl,
            },
        };
    }

    async verifyOtp({ query }: ServiceClientContextDto): Promise<ServiceResponseData> {
        const { phone, otp } = query;
        const key = `otp:${DriversService.role}:${phone}`;

        const savedOtp = await this.redis.cacheCli.get(key);
        if(!savedOtp) {
            throw new Error(`Otp not found or expired`);
        }

        if(savedOtp !== otp) {
            throw new Error('invalid otp');
        }

        await this.redis.cacheCli.del(key);

        let driver = await this.pg.models.Driver.findOne({ where: { phone } });
        if(!driver) {
            driver = await this.pg.models.Driver.create({ phone });
        }

        const newSession = await this.pg.models.DriverSession.create({
            driverId: driver!.id,
            refreshExpiresAt: +new Date(),
        });

        const accessToken = this.tokenService.generateAccessToken({
            driverId: driver.id,
            sessionId: newSession.id,
        });

        await newSession.update({
            refreshExpiresAt: accessToken.payload.refreshExpiresAt,
        })
        await newSession.reload();
        return {
            message: 'OTP verified successfully!',
            data: {
                success: true,
                phone,
                accessToken,
            },
        }
    }
}
