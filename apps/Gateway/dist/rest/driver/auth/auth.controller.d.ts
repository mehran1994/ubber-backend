import { DriverAuthService } from "./auth.service";
import { DriverRequestInputDto } from "src/dtos/driver.dto";
export declare class DriverAuthController {
    private readonly driverService;
    constructor(driverService: DriverAuthService);
    requestOtp(body: DriverRequestInputDto): Promise<any>;
}
