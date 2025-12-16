import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class MainServiceClient {
    constructor(
        @Inject('Main') private readonly cli: ClientProxy
    ) { }

    async callEvent(data) {
        try {
            return await lastValueFrom(this.cli.emit("callEvent", data));
        } catch (e) {
            return {
                context: data,
                status: "FAILED",
                code: HttpStatus.SERVICE_UNAVAILABLE,
                message: null,
                error: null,
                data: `${e}`
            }
        }
    }
    async callAction(data) {
        try {
            return await lastValueFrom(this.cli.send("callAction", data));
        } catch (e) {
            return {
                context: data,
                status: "FAILED",
                code: HttpStatus.SERVICE_UNAVAILABLE,
                message: null,
                error: null,
                data: `${e}`
            }
        }
    }
}