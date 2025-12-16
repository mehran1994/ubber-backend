"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const admin_module_1 = require("./admin/admin.module");
const driver_module_1 = require("./driver/driver.module");
const passenger_module_1 = require("./passenger/passenger.module");
let RestModule = class RestModule {
};
exports.RestModule = RestModule;
exports.RestModule = RestModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admin_module_1.AdminModule,
            driver_module_1.DriverModule,
            passenger_module_1.PassengerModule,
            core_1.RouterModule.register([
                {
                    path: 'admin',
                    module: admin_module_1.AdminModule
                },
                {
                    path: 'driver',
                    module: driver_module_1.DriverModule,
                },
                {
                    path: 'passenger',
                    module: passenger_module_1.PassengerModule,
                },
            ]),
        ],
    })
], RestModule);
//# sourceMappingURL=rest.module.js.map