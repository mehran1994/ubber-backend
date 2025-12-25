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
exports.ServiceController = void 0;
const common_1 = require("@nestjs/common");
const actions_service_1 = require("./actions.service");
const microservices_1 = require("@nestjs/microservices");
const dto_1 = require("./dto");
let ServiceController = class ServiceController {
    actions;
    constructor(actions) {
        this.actions = actions;
    }
    async callTestMessage(data) {
        try {
            const res = await this.actions.findAndCall(data);
            return {
                context: data,
                status: 'SUCCEED',
                code: 200,
                message: res?.message || 'OK',
                error: null,
                data: res?.data,
            };
        }
        catch (e) {
            return {
                context: data,
                status: "FAILED",
                code: e?.code || common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: e?.msg || null,
                error: e?.message || "err_service_notHandledError",
                data: null
            };
        }
    }
};
exports.ServiceController = ServiceController;
__decorate([
    (0, microservices_1.MessagePattern)('callAction'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ServiceClientActionInputDto]),
    __metadata("design:returntype", Promise)
], ServiceController.prototype, "callTestMessage", null);
exports.ServiceController = ServiceController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [actions_service_1.SelfActionService])
], ServiceController);
//# sourceMappingURL=service.controller.js.map