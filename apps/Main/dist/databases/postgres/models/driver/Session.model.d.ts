import { Model } from "sequelize-typescript";
export declare class DriverSession extends Model {
    id: string;
    driverId: string;
    refreshExpiresAt: Date;
}
