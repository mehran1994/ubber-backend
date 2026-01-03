import { Model } from "sequelize-typescript";
export declare class Driver extends Model {
    id: string;
    phone?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    carModel?: string;
    carColor?: string;
    plateNumber?: string;
    isActive?: boolean;
    isOnline?: boolean;
    isVerified?: boolean;
}
