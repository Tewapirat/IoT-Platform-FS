import { Service } from "typedi";
import { User } from "./interfaces/user.interface";
import { UserModel } from "./schemas/user.schema";
import { hash } from "bcrypt";
import { CreateUserDto } from "./dto/user.dto";
import { HttpException } from "@/common/exceptions/HttpException";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Document } from "mongoose";
import { DeleteUserDto } from "./dto/delete-user.dto";

@Service()
export class UserService {

    public async findAll(): Promise<User[]> {
        const users: User[] = await UserModel.find();
        return users
    }

    public async findById(userId: String): Promise<User> {
        const user: User = await UserModel.findOne({ _id: userId })
        return user
    }

    public async create(user: CreateUserDto): Promise<User> {
        const obj: User = await UserModel.findOne({ email: user.email })
        if (obj) {
            throw new HttpException(409, `this email ${obj.email} already exsits`)
        }
        const hashPassword = await hash(user.password, 10)
        const newUser: User = await UserModel.create({ ...user, password: hashPassword })
        return newUser
    }

    public async update(updateUser: UpdateUserDto): Promise<User> {
        const findUser: User & Document = await UserModel.findById(updateUser._id)
        if (!findUser) {
            throw new HttpException(404, `This user ${updateUser.first_name} not found`)
        }
        findUser.first_name = updateUser.first_name
        findUser.last_name = updateUser.last_name
        await findUser.save()
        return findUser
    }

    public async delete(deleteUser: DeleteUserDto): Promise<User>{
        const findUser: User & Document = await UserModel.findById(deleteUser._id)
        if(!findUser){
            throw new HttpException(404, 'user not found')
        }

        findUser.deleteOne()
        return findUser
    }



}