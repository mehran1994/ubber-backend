"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DriversService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../databases/redis/redis.service");
const dto_1 = require("../services/dto");
let DriversService = class DriversService {
    static { DriversService_1 = this; }
    redis;
    static role = "driver";
    constructor(redis) {
        this.redis = redis;
    }
    async requestOtp({ query }) {
        const { phone } = query;
        const key = `otp:${DriversService_1.role}:${phone}`;
        const existing = await this.redis.cacheCli.get(key);
        if (existing)
            throw new dto_1.SrvError(common_1.HttpStatus.BAD_REQUEST, 'OTP already sent');
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
};
exports.DriversService = DriversService;
exports.DriversService = DriversService = DriversService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], DriversService);
//# sourceMappingURL=drivers.service.js.map