import { Routes } from "@/common/interfaces/routes.interface";
import { Router } from "express";
import { UserController } from "./user.controller";
import Container from "typedi";
import { ValidationMiddleware } from "@/common/middlewares/validation.middleware";
import { CreateUserDto } from "./dto/user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { AuthMiddleware, RequireAdmin } from "@/common/middlewares/auth.middleware";
import { UpdateRoleDto } from "./dto/update-user-role.dto";


export class UserRoute implements Routes {
    public path = "/user";
    public router = Router();


    private controller = Container.get(UserController);

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`,AuthMiddleware,RequireAdmin,this.controller.get);
        this.router.get(`${this.path}/:id`,AuthMiddleware,RequireAdmin, this.controller.getById);
        this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.controller.create);
        this.router.put(`${this.path}`,AuthMiddleware,RequireAdmin,ValidationMiddleware(UpdateUserDto), this.controller.update);
        this.router.put(`${this.path}/role`,AuthMiddleware,RequireAdmin,ValidationMiddleware(UpdateRoleDto), this.controller.updateRole);
        this.router.delete(`${this.path}`,AuthMiddleware,RequireAdmin,ValidationMiddleware(DeleteUserDto), this.controller.delete);
    }


}




