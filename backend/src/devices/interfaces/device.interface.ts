import { Types } from "mongoose"

export interface Device {
    _id: Types.ObjectId
    id: string
    name: string
    online_status:boolean
    active_date:Date
    userId: Types.ObjectId
}