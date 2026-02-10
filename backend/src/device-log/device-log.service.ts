import { IService } from "@/common/interfaces/service.interface";
import { Log } from "./interfaces/device-log.interface";
import { LogModel } from "./schemas/device-log.schema";
import { Service } from "typedi";
import { CreateLogDto } from "./dto/create-log.dto";
import { DeleteLogDto } from "./dto/delete-log.dto";


@Service()
export class DeviceLogService implements IService{
    public async findAll(device_id: string): Promise<any> {
        return await LogModel.find({device_id:device_id})
    }
    public findById(id: string): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
    public async create(createLog:CreateLogDto ): Promise<Log> {
        const createdLog:Log = await LogModel.create(createLog)
        return createdLog
    }
    public update(updateUser: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public async delete(deleteLog: DeleteLogDto): Promise<{acknowledged: boolean, deletedCount: number}> {
        return await LogModel.deleteMany({device_id: deleteLog.device_id})
    }

}