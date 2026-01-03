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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverVerifyOtpInputDto = exports.DriverRequestInputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DriverRequestInputDto {
    phone;
}
exports.DriverRequestInputDto = DriverRequestInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        required: true,
        example: '+3161999999',
        description: 'Driver phone number',
    }),
    (0, class_validator_1.IsPhoneNumber)('NL', { message: 'Enter a valid phone number' }),
    __metadata("design:type", String)
], DriverRequestInputDto.prototype, "phone", void 0);
class DriverVerifyOtpInputDto {
    phone;
    otp;
}
exports.DriverVerifyOtpInputDto = DriverVerifyOtpInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        required: true,
        example: '+3161999999',
        description: 'Driver phone number',
    }),
    (0, class_validator_1.IsPhoneNumber)('NL', { message: 'Enter a valid phone number' }),
    __metadata("design:type", String)
], DriverVerifyOtpInputDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1234' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(4, 6),
    (0, class_validator_1.IsPhoneNumber)('NL', { message: 'Enter a valid phone number' }),
    __metadata("design:type", String)
], DriverVerifyOtpInputDto.prototype, "otp", void 0);
//# sourceMappingURL=driver.dto.js.map