import { IsNotEmpty, IsString } from "class-validator";
import { CreateDeviceDto } from "./create-device.dto";

export class UpdateDeviceDto extends CreateDeviceDto{

    @IsString()
    @IsNotEmpty()
    readonly _id:string
}