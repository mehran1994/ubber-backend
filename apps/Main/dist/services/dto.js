"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SrvError = exports.ServiceResponseData = exports.ServiceClientOutputDto = exports.ServiceClientEventInputDto = exports.ServiceClientActionInputDto = exports.ServiceClientContextDto = void 0;
const common_1 = require("@nestjs/common");
class ServiceClientContextDto {
    query;
    set;
    options;
}
exports.ServiceClientContextDto = ServiceClientContextDto;
class ServiceClientActionInputDto extends ServiceClientContextDto {
    provider;
    action;
}
exports.ServiceClientActionInputDto = ServiceClientActionInputDto;
class ServiceClientEventInputDto extends ServiceClientContextDto {
    provider;
    event;
}
exports.ServiceClientEventInputDto = ServiceClientEventInputDto;
class ServiceClientOutputDto {
    context;
    status;
    code;
    message;
    error;
    data;
}
exports.ServiceClientOutputDto = ServiceClientOutputDto;
class ServiceResponseData {
    message;
    data;
}
exports.ServiceResponseData = ServiceResponseData;
class SrvError extends Error {
    code;
    constructor(status = common_1.HttpStatus.INTERNAL_SERVER_ERROR, error, options) {
        super(error, options);
        this.code = status;
    }
}
exports.SrvError = SrvError;
//# sourceMappingURL=dto.js.map