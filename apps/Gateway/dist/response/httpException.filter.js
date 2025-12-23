"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
exports.throwHttpErr = throwHttpErr;
exports.handleSrvCliResponse = handleSrvCliResponse;
const common_1 = require("@nestjs/common");
function throwHttpErr(errorData) {
    throw new common_1.HttpException(errorData?.error || errorData.message || 'err_service_failed', errorData.code || common_1.HttpStatus.FAILED_DEPENDENCY);
}
function handleSrvCliResponse(data) {
    if (data?.status !== 'SUCCEED')
        throwHttpErr(data);
    return data.data;
}
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const error = exception.getResponse();
        let errorMessage = error.error || error.message || exception.name || null;
        let errorDescription = error.message || exception.name || null;
        response.status(exception.getStaus()).send({
            code: exception.getStausCode(),
            status: 'FAILED',
            message: errorMessage,
            error: Array.isArray(errorDescription) ? errorDescription : [errorDescription],
            data: error?.data || null
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
//# sourceMappingURL=httpException.filter.js.map