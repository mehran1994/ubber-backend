import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { ServiceClientOutputDto } from 'src/services/dto';
export declare function throwHttpErr(errorData: ServiceClientOutputDto<any>): void;
export declare function handleSrvCliResponse(data: ServiceClientOutputDto<any>): any;
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any;
}
