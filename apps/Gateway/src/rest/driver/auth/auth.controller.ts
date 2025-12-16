import {Body, Controller, Post} from '@nestjs/common';
import {DriverAuthService} from "./auth.service";
import {ApiOperation} from "@nestjs/swagger";
import {DriverSignupDto} from "src/dtos/driver.dto";

@Controller('auth')
export class DriverAuthController {
    constructor(private readonly driverService: DriverAuthService) {}

    @Post('signup')
    @ApiOperation({ summary: 'Create Driver Auth' })
    async signup(@Body() body: DriverSignupDto) {
        return await this.driverService.signup(body);
    }
}
