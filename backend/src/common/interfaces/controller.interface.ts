import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "./auth.interface";

export interface IController {
    get :(req:RequestWithUser, res:Response, next:NextFunction)=> void
    getById :(req:RequestWithUser, res:Response, next:NextFunction)=> void
    create :(req:RequestWithUser, res:Response, next:NextFunction)=> void
    update :(req:Request, res:Response, next:NextFunction)=> void
    delete :(req:Request, res:Response, next:NextFunction)=> void
}