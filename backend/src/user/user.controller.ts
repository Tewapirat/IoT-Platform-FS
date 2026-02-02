import { NextFunction, Request, Response } from "express";
import Container, { Service } from "typedi";
import { UserService } from "./user.service";
import { User } from "./interfaces/user.interface";
import { CreateUserDto } from "./dto/user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";

@Service()
export class UserController {

    private service = Container.get(UserService)

    public get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result: User[] = await this.service.findAll()
            res.status(200).json({ message: "get", data: result })
        } catch (error) {
            next(error)

        }

    }

    public getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            const result: User = await this.service.findById(id)
            res.status(200).json({ message: "getById", data: result })
        } catch (error) {
            next(error)

        }

    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body)
            const userData: CreateUserDto = { ...req.body }
            const newUser: User = await this.service.create(userData)
            res.status(201).json({ message: "create", data: newUser })
        } catch (error) {
            next(error)

        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateUser: UpdateUserDto = { ...req.body }
            const result = await this.service.update(updateUser)
            res.status(200).json({ message: "update", data: result })

        } catch (error) {
            next(error)

        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteUser: DeleteUserDto = { ...req.body }
            const result = await this.service.delete(deleteUser)
            res.status(200).json({ message: "delete" })
        } catch (error) {
            next(error)
        }
    }

}