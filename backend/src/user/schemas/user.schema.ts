import { Document, model, Schema } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema: Schema = new Schema<User>({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    role: { type: String, default: "user" },
    enabled: { type: Boolean, default: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    { timestamps: true })

export const UserModel = model<User & Document>('User', UserSchema)