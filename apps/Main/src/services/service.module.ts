import {Module} from "@nestjs/common";
import { ServiceController } from 'src/services/service.controller'
import {SelfActionService} from "./actions.service";
import {DriversService} from "../providers/drivers.service";

@Module({
    imports: [],
    controllers: [ServiceController],
    providers: [
        SelfActionService,
        DriversService,
    ],
})
export class ServiceModule {}