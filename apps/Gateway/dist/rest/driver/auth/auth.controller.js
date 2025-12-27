"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverAuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const swagger_1 = require("@nestjs/swagger");
const driver_dto_1 = require("../../../dtos/driver.dto");
const httpException_filter_1 = require("../../../response/httpException.filter");
const repons_interceptors_1 = require("../../../response/repons.interceptors");
let DriverAuthController = class DriverAuthController {
    driverService;
    constructor(driverService) {
        this.driverService = driverService;
    }
    async requestOtp(body) {
        return await this.driverService.requestOtp(body);
    }
    async verifyOtp(body) {
        return await this.driverService.verifyOtp(body);
    }
};
exports.DriverAuthController = DriverAuthController;
__decorate([
    (0, common_1.Post)('request-otp'),
    (0, swagger_1.ApiOperation)({ summary: 'Request otp in app by phone number' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driver_dto_1.DriverRequestInputDto]),
    __metadata("design:returntype", Promise)
], DriverAuthController.prototype, "requestOtp", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify otp sent to driver phone number' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [driver_dto_1.DriverVerifyOtpInputDto]),
    __metadata("design:returntype", Promise)
], DriverAuthController.prototype, "verifyOtp", null);
exports.DriverAuthController = DriverAuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    (0, common_1.UseFilters)(httpException_filter_1.HttpExceptionFilter),
    (0, common_1.UseInterceptors)(repons_interceptors_1.ResponseInterceptor),
    __metadata("design:paramtypes", [auth_service_1.DriverAuthService])
], DriverAuthController);
//# sourceMappingURL=auth.controller.js.map