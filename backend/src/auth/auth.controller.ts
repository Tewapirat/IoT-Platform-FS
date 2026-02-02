import { NextFunction, Request, Response } from "express";
import Container, { Service } from "typedi";
import { UserLoginDto } from "./dto/user-login.dto";
import { AuthService } from "./auth.service";
import { UserInfo } from "./interfaces/user-info.interface";


@Service()
export class AuthController {
    
    private service: AuthService = Container.get(AuthService) 

    public login = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const userLogin: UserLoginDto = {...req.body}
            const userInfo: UserInfo = await this.service.login(userLogin)
            res.status(200).json({message:'login', data: userInfo})
        } catch (error) {
            next(error)
        }


    }

    public logout = async (req:Request, res:Response, next:NextFunction) => {

    }



}