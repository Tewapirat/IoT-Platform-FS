import { Document, model, Schema, Types } from "mongoose";
import { Device } from "../interfaces/device.interface";

const DeviceSchema: Schema = new Schema({
    id: { type: String, default: null },
    name: { type: String, default: null },
    online_status: { type: Boolean, default: false },
    data: { type: Object, default: null },
    active_date: { type: Date, default: null },
    userId: { type: Types.ObjectId, default: null }

},
    { timestamps: true })

export const DeviceModel = model<Device & Document>('Device', DeviceSchema)