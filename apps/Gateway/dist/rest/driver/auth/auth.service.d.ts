import { DriverRequestInputDto } from "src/dtos/driver.dto";
import { MainServiceClient } from "src/services/main.service";
export declare class DriverAuthService {
    private readonly mainSrvCli;
    constructor(mainSrvCli: MainServiceClient);
    requestOtp(body: DriverRequestInputDto): Promise<any>;
    verifyOtp(body: DriverRequestInputDto): Promise<any>;
}
