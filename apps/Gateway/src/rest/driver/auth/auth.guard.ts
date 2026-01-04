import {CanActivate, ExecutionContext, UnauthorizedException} from "@nestjs/common";
import {DriverAuthService} from "./auth.service";

export class DriverAuthGuard implements CanActivate {
    constructor(private readonly authService: DriverAuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const token = request.cookies['auth_driver'];

        if(!token) throw new UnauthorizedException('err_auth_unauthorized');

        const autherized = await this.authService.autherize(token);

        const data = autherized;

        if(!data.isAutherized) throw new UnauthorizedException('err_auth_unauthorized');

        // Set request data
        request.driver = data.driver;
        request.session = data.session;
        request.acc_type = 'DRIVER';

        // Set new access token if issued
        if(data.tokenData) {
            request.cookie('auth_driver', data.tokenData.token, {
                httpOnly: true,
                maxAge: data.tokenData.ttl,
            });
        }

        // Clear cookie if needed
        if(data.clearCookie) {
            response.clearCookie(data.clearCookie)
        }

        return true;
    }
}