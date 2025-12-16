import {ApiProperty} from "@nestjs/swagger";
import {IsPhoneNumber} from "class-validator";

export class DriverSignupDto {
    @ApiProperty({
        type: String,
        required: true,
        example: '+3161999999',
        description: 'Driver phone number',
    })
    @IsPhoneNumber('NL', {message: 'Enter a valid phone number'})
    phone: string;
}