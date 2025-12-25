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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
const config_1 = require("@nestjs/config");
let RedisService = class RedisService {
    configService;
    logger = new common_1.Logger('databases/redis/redis.service');
    cacheCli;
    sessionCli;
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        const cacheClient = new ioredis_1.default({
            host: this.configService.get('Redis.host'),
            port: this.configService.get('Redis.port'),
            db: this.configService.get('Redis.cacheDb'),
        });
        cacheClient.on('error', (e) => {
            this.logger.fatal('cacheClient connecting error');
            this.logger.error(e);
            process.exit(1);
        });
        cacheClient.on('connect', () => {
            this.logger.verbose('cacheClient is connected!');
        });
        this.cacheCli = cacheClient;
        const sessionClient = new ioredis_1.default({
            host: this.configService.get('Redis.host'),
            port: this.configService.get('Redis.port'),
            db: this.configService.get('Redis.cacheDb'),
        });
        sessionClient.on('error', (e) => {
            this.logger.fatal('sessionClient connecting error');
            this.logger.error(e);
            process.exit(1);
        });
        sessionClient.on('connect', () => {
            this.logger.verbose('sessionClient is connected!');
        });
        this.sessionCli = sessionClient;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
//# sourceMappingURL=redis.service.js.map