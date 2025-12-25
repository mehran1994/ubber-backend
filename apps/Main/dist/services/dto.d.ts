import { HttpStatus } from "@nestjs/common";
export declare class ServiceClientContextDto {
    query?: object | any;
    set?: object | any;
    options?: object | any;
}
export declare class ServiceClientActionInputDto extends ServiceClientContextDto {
    provider: string;
    action: string;
}
export declare class ServiceClientEventInputDto extends ServiceClientContextDto {
    provider: string;
    event: string;
}
export declare class ServiceClientOutputDto<ContextDto> {
    context: ContextDto;
    status: "SUCCEED" | "FAILED" | null;
    code: number | null;
    message?: string | null;
    error?: string | null;
    data?: any;
}
export declare class ServiceResponseData {
    message?: string;
    data?: any;
}
export declare class SrvError extends Error {
    readonly code: HttpStatus;
    constructor(status: HttpStatus | undefined, error: string, options?: ErrorOptions);
}
