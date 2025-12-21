import {Body, Controller, Post} from '@nestjs/common';
import {DriverAuthService} from "./auth.service";
import {ApiOperation} from "@nestjs/swagger";
import { DriverRequestInputDto } from "src/dtos/driver.dto";

@Controller('auth')
export class DriverAuthController {
    constructor(private readonly driverService: DriverAuthService) {}

    @Post('request-otp')
    @ApiOperation({ summary: 'Request otp in app by phone number' })
    async requestOtp(@Body() body: DriverRequestInputDto) {
        return await this.driverService.requestOtp(body);
    }
}
