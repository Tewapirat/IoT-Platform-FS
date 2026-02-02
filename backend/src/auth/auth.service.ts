import { Service } from "typedi";
import { UserLoginDto } from "./dto/user-login.dto";
import { User } from "@/user/interfaces/user.interface";
import { UserModel } from "@/user/schemas/user.schema";
import { UserInfo } from "./interfaces/user-info.interface";
import { HttpException } from "@/common/exceptions/HttpException";
import { compare } from "bcrypt";
import { SECRET_KEY } from "@/common/config";
import { sign } from "jsonwebtoken";



const createToken = (user:User): UserInfo => {
    const payload = {_id: user._id}
    const exprires: number = 60 * 60 * 24;
    const token = sign(payload,SECRET_KEY,{expiresIn: exprires})
    return{
        _id:user._id,
        email:user.email,
        first_name:user.first_name,
        last_name:user.last_name,
        token:token
    }

}



@Service()
export class AuthService {


    public async login(userLogin:UserLoginDto): Promise<UserInfo>{
        const findUser: User = await UserModel.findOne({email:userLogin.email})
        if(!findUser){
            throw new HttpException(404, `this email ${userLogin.email} not found`)
        }
        const passMactching: boolean = await compare(userLogin.password, findUser.password)
        if (!passMactching){
            throw new HttpException(409, `this email ${userLogin.email} password not matching`)
        }

        const result: UserInfo = createToken(findUser)
        return result

    }

}