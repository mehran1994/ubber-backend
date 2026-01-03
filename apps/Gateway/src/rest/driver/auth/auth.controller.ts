import {Body, Controller, Post, Res, UseFilters, UseInterceptors} from '@nestjs/common';
import {DriverAuthService} from "./auth.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {DriverRequestInputDto, DriverVerifyOtpInputDto} from "src/dtos/driver.dto";
import {HttpExceptionFilter} from "src/response/httpException.filter";
import {ResponseInterceptor} from "src/response/repons.interceptors";

@ApiTags('Auth')
@Controller('auth')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class DriverAuthController {
    constructor(private readonly driverService: DriverAuthService) {}

    @Post('request-otp')
    @ApiOperation({ summary: 'Request otp in app by phone number' })
    async requestOtp(@Body() body: DriverRequestInputDto) {
        return await this.driverService.requestOtp(body);
    }

    @Post('verify-otp')
    @ApiOperation({ summary: 'Verify otp sent to driver phone number' })
    async verifyOtp(@Body() body: DriverVerifyOtpInputDto, @Res({ passthrough: true }) res) {
        const verifyOtpData = await this.driverService.verifyOtp(body);
        const tokenData = verifyOtpData.accessToken;
        res.cookie(tokenData.name, tokenData.data, {
            maxAge: tokenData.ttl,
            httpOnly: true,
            secure: true,
            samePath: 'strict',
            path: '/'
        });

        delete verifyOtpData.accessToken;

        return verifyOtpData;
    }
}
