import { DriverAuthService } from "./auth.service";
import { DriverSignupDto } from "src/dtos/driver.dto";
export declare class DriverAuthController {
    private readonly driverService;
    constructor(driverService: DriverAuthService);
    signup(body: DriverSignupDto): Promise<any>;
}
