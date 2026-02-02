import { Routes } from "@/common/interfaces/routes.interface";
import { Router } from "express";
import Container from "typedi";
import { AuthController } from "./auth.controller";
import { ValidationMiddleware } from "@/common/middlewares/validation.middleware";
import { UserLoginDto } from "./dto/user-login.dto";

export class AuthRoute implements Routes {
    public path = '/auth'
    public router = Router()

    private controller = Container.get(AuthController)


    constructor() {
        this.initalizeRoute()
    }

    private initalizeRoute() {
        this.router.post(`${this.path}/login`, ValidationMiddleware(UserLoginDto), this.controller.login)
        this.router.post(`${this.path}/logout`, this.controller.logout)
    }



}