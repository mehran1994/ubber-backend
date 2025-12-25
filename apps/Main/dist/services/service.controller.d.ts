import { SelfActionService } from './actions.service';
import { ServiceClientActionInputDto, ServiceClientOutputDto } from "./dto";
export declare class ServiceController {
    private readonly actions;
    constructor(actions: SelfActionService);
    callTestMessage(data: ServiceClientActionInputDto): Promise<ServiceClientOutputDto<ServiceClientActionInputDto>>;
}
