import { DriversService } from "../providers/drivers.service";
import { ServiceClientActionInputDto, ServiceResponseData } from "./dto";
export declare class SelfActionService {
    private readonly driversService;
    constructor(driversService: DriversService);
    findAndCall(data: ServiceClientActionInputDto): Promise<ServiceResponseData>;
}
