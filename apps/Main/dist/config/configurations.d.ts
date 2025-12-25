export declare const configurations: (((() => {
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
    dialect: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
    dialect: string;
}>) | ((() => {
    host: string;
    port: number;
    cacheDb: number;
    sessionDb: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
    cacheDb: number;
    sessionDb: number;
}>))[];
