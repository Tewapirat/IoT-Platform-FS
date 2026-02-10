import { Document, model, Schema } from "mongoose";
import { Log } from "../interfaces/device-log.interface";

const LogSchema: Schema = new Schema({
    device_id:{type:String, default:null},
    data:{type:Object, default:null},
    log_date:{type:Date, default:null}
})

export const LogModel = model<Log & Document>('Logs',LogSchema)