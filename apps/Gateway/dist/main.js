"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_1 = __importDefault(require("express"));
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const swagger_config_1 = require("./config/swagger.config");
async function bootstrap() {
    const server = (0, express_1.default)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('App.port');
    (0, swagger_config_1.setupSwagger)(app, configService);
    await app.listen(port);
    console.log(`Server running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map