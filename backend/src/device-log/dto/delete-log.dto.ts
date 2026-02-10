import { IsNotEmpty, IsString } from "class-validator";

export class DeleteLogDto {

    @IsString()
    @IsNotEmpty()
    readonly device_id:string
}