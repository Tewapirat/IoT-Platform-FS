import { IsNotEmpty, IsString } from "class-validator";

export class DeleteDeviceDto {
    @IsString()
    @IsNotEmpty()
    readonly _id:string
}