import {Body, Controller, Post, UseFilters, UseInterceptors} from '@nestjs/common';
import {DriverAuthService} from "./auth.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { DriverRequestInputDto } from "src/dtos/driver.dto";
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
}
