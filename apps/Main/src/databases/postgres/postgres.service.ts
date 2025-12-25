import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {Sequelize} from "sequelize-typescript";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class PostgresService implements OnModuleInit {
    private readonly logger = new Logger(PostgresService.name);
    public connection: Sequelize;

    constructor(private readonly configService: ConfigService) {}

    async onModuleInit() {
        try {
            const dbConfig = this.configService.get('Database');

            this.connection = new Sequelize({
                dialect: dbConfig.dialect,
                host: dbConfig.host,
                port: dbConfig.port,
                username: dbConfig.username,
                password: dbConfig.password,
                database: dbConfig.database,
                logging: false,
            });

            await this.connection.authenticate();
            this.logger.log(`Connected to Postgres Database`);
        } catch (e) {
            this.logger.error('Failed to connect to Postgres Database', e);
            process.exit(1);
        }
    }
}