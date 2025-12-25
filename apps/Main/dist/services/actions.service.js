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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfActionService = void 0;
const common_1 = require("@nestjs/common");
const drivers_service_1 = require("../providers/drivers.service");
const lodash_1 = __importDefault(require("lodash"));
let SelfActionService = class SelfActionService {
    driversService;
    constructor(driversService) {
        this.driversService = driversService;
    }
    async findAndCall(data) {
        const providerName = data?.provider || null;
        const actionName = data?.action || null;
        if (!providerName || !actionName)
            throw new Error('err_service_noActionOrProvider');
        let provider;
        switch (providerName) {
            case 'DRIVERS':
                provider = this.driversService;
                break;
            default:
                provider = null;
        }
        if (!provider || !provider[actionName])
            throw new Error('err_service_actionNotFound');
        const response = await provider[actionName](lodash_1.default.pick(data, ["query", "set", "options"]));
        return {
            message: response?.message ?? 'Ok',
            data: response?.data ?? response,
        };
    }
};
exports.SelfActionService = SelfActionService;
exports.SelfActionService = SelfActionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [drivers_service_1.DriversService])
], SelfActionService);
//# sourceMappingURL=actions.service.js.map