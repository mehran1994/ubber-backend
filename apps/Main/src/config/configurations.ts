import { registerAs } from '@nestjs/config';

const DatabaseConfig = registerAs('Database', () => ({
    database: 'ubberdb',
    username: 'ubber',
    password: 'ubber_pass',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
}));

const RedisConfig = registerAs('Redis', () => ({
    host: '127.0.0.1',
    port: 6379,
    cacheDb: 10,
    sessionDb: 11,
}));

export const configurations = [DatabaseConfig, RedisConfig];