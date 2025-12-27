import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsPhoneNumber, IsString, Length} from "class-validator";

export class DriverRequestInputDto {
    @ApiProperty({
        type: String,
        required: true,
        example: '+3161999999',
        description: 'Driver phone number',
    })
    @IsPhoneNumber('NL', {message: 'Enter a valid phone number'})
    phone: string;
}

export class DriverVerifyOtpInputDto {
    @ApiProperty({
        type: String,
        required: true,
        example: '+3161999999',
        description: 'Driver phone number',
    })
    @IsPhoneNumber('NL', {message: 'Enter a valid phone number'})
    phone: string;

    @ApiProperty({ example: '1234'})
    @IsString()
    @IsNotEmpty()
    @Length(4, 6)
    @IsPhoneNumber('NL', {message: 'Enter a valid phone number'})
    otp: string;
}