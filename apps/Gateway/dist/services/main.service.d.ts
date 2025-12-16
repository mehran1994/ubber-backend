import { ClientProxy } from "@nestjs/microservices";
export declare class MainServiceClient {
    private readonly cli;
    constructor(cli: ClientProxy);
    callEvent(data: any): Promise<any>;
    callAction(data: any): Promise<any>;
}
