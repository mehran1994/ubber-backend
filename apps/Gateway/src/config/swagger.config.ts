import {INestApplication} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { AdminModule } from "../rest/admin/admin.module";
import { DriverModule } from "../rest/driver/driver.module";
import { PassengerModule } from "../rest/passenger/passenger.module";

interface SwaggerModuleItem {
    path: string;
    module: any;
}

export function setupSwagger(app: INestApplication, configService: ConfigService) {
    app.get(ConfigService);
    const swaggerTitle = configService.get('Swagger.title');
    const swaggerDescription = configService.get('Swagger.description');
    const swaggerVersion = configService.get('Swagger.version');
    const appVersion = configService.get('App.version');

    const swaggerOptions = new DocumentBuilder()
        .setTitle(swaggerTitle)
        .setDescription(swaggerDescription)
        .setVersion(swaggerVersion)
        .build();

    const documents = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup(`${appVersion}/docs`, app, documents);

    const modules: SwaggerModuleItem[] = [
        { path: 'admin', module: AdminModule },
        { path: 'driver', module: DriverModule },
        { path: 'passenger', module: PassengerModule },
    ];

    modules.forEach(({path, module}) => {
        const doc = SwaggerModule.createDocument(app, swaggerOptions, {
            include: [module],
        });
        SwaggerModule.setup(`${appVersion}/docs/${path}`,app, doc);
    });
}