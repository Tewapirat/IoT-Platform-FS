import { Routes } from "@/common/interfaces/routes.interface";
import { Router } from "express";
import { DeviceLogController } from "./device-log.controller";
import Container from "typedi";
import { AuthMiddleware } from "@/common/middlewares/auth.middleware";
import { ValidationMiddleware } from "@/common/middlewares/validation.middleware";
import { DeleteLogDto } from "./dto/delete-log.dto";


export class DeviceLogRoute implements Routes{
    public path = "/log";
    public router = Router();

    private controller : DeviceLogController = Container.get(DeviceLogController)


    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get(`${this.path}/:device_id`, AuthMiddleware, this.controller.get)
        this.router.delete(`${this.path}`, AuthMiddleware,ValidationMiddleware(DeleteLogDto), this.controller.delete)
    }



}