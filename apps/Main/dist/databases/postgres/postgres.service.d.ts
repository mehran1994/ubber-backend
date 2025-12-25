import { OnModuleInit } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "@nestjs/config";
export declare class PostgresService implements OnModuleInit {
    private readonly configService;
    private readonly logger;
    connection: Sequelize;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
}
