import { Injectable } from '@nestjs/common';
import {DriverRequestInputDto} from "src/dtos/driver.dto";
import {MainServiceClient} from "src/services/main.service";

@Injectable()
export class DriverAuthService {
    constructor(private readonly mainSrvCli: MainServiceClient) {
    }

    async requestOtp(body: DriverRequestInputDto) {
        const data = await this.mainSrvCli.callAction({
            provider: 'DRIVERS',
            action: 'requestOtp',
            query: body
        });

        return data;
    }
}
