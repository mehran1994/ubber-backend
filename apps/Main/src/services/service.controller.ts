import {Controller, HttpStatus} from "@nestjs/common";
import { SelfActionService } from './actions.service';
import {MessagePattern} from "@nestjs/microservices";
import {ServiceClientActionInputDto, ServiceClientOutputDto} from "./dto";

@Controller()
export class ServiceController {
    constructor(
        private readonly actions: SelfActionService,
    ) {}

    @MessagePattern('callAction')
    async callTestMessage(data: ServiceClientActionInputDto): Promise<ServiceClientOutputDto<ServiceClientActionInputDto>> {
        try {
            const res = await this.actions.findAndCall(data);
            return {
                context: data,
                status: 'SUCCEED',
                code: 200,
                message: res?.message || 'OK',
                error: null,
                data: res?.data,
            }
        } catch (e) {
            return {
                context: data,
                status: "FAILED",
                code: e?.code || HttpStatus.INTERNAL_SERVER_ERROR,
                message: e?.msg || null,
                error: e?.message || "err_service_notHandledError",
                data: null
            }
        }
    }
}