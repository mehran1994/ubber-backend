import { Injectable } from '@nestjs/common';
import {DriverSignupDto} from "src/dtos/driver.dto";
import {MainServiceClient} from "src/services/main.service";

@Injectable()
export class DriverAuthService {
    constructor(private readonly mainSrvCli: MainServiceClient) {
    }

    async signup(body: DriverSignupDto) {
        const data = await this.mainSrvCli.callAction({
            provider: 'DRIVERS',
            action: 'signIn',
            query: body
        });

        return data;
    }
}
