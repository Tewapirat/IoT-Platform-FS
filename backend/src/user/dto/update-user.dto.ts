import { IsNotEmpty, IsString} from "class-validator"

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    readonly _id: string

    @IsString()
    @IsNotEmpty()
    readonly first_name: string

    @IsString()
    @IsNotEmpty()
    readonly last_name: string
}