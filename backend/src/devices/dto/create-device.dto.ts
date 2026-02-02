import { IsNotEmpty, IsString } from "class-validator"

export class CreateDeviceDto {

    @IsString()
    @IsNotEmpty()
    readonly id: string

    @IsString()
    @IsNotEmpty()
    readonly name: string


}