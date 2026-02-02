import { IsNotEmpty, IsString } from "class-validator";
import { UpdateUserDto } from "./update-user.dto";


export class UpdateRoleDto {

    @IsString()
    @IsNotEmpty()
    readonly _id: string

    @IsString()
    @IsNotEmpty()
    readonly role: string
}