import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from "@nestjs/common";
import { Response } from "express";
import { ServiceClientOutputDto } from 'src/services/dto';

export function throwHttpErr(errorData: ServiceClientOutputDto<any>) {
    throw new HttpException(errorData?.error || errorData.message || 'err_service_failed', errorData.code || HttpStatus.FAILED_DEPENDENCY);
}

export function handleSrvCliResponse(data: ServiceClientOutputDto<any>) {
    if (data?.status !== 'SUCCEED') throwHttpErr(data);
    return data.data;
}


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const error = exception.getResponse();

        let errorMessage = error.error || error.message || exception.name || null;
        let errorDescription = error.message || exception.name || null;

        response.status(exception.getStaus()).send({
            code: exception.getStausCode(),
            status: 'FAILED',
            message: errorMessage,
            error: Array.isArray(errorDescription) ? errorDescription : [errorDescription],
            data: error?.data || null
        })
    }
}