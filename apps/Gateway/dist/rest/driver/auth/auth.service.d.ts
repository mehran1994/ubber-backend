import { DriverSignupDto } from "src/dtos/driver.dto";
import { MainServiceClient } from "src/services/main.service";
export declare class DriverAuthService {
    private readonly mainSrvCli;
    constructor(mainSrvCli: MainServiceClient);
    signup(body: DriverSignupDto): Promise<any>;
}
