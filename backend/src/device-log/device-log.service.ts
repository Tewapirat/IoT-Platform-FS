import { IService } from "@/common/interfaces/service.interface";
import { Log } from "./interfaces/device-log.interface";
import { LogModel } from "./schemas/device-log.schema";
import { Service } from "typedi";
import { CreateLogDto } from "./dto/create-log.dto";
import { DeleteLogDto } from "./dto/delete-log.dto";


@Service()
export class DeviceLogService implements IService {
    public async findAll(device_id: string): Promise<any> {
        return await LogModel.find({ device_id: device_id })
    }
    public findById(id: string): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

    async getLogCurrent(id: string): Promise<Log[]> {
        let today = new Date();
        console.log('getLogCurrent > NOW:', today.toLocaleString());
        let strMonth = `${(today.getMonth() + 1).toString().padStart(2, '0')}`;
        let strDate = `${today.getDate().toString().padStart(2, '0')}`;
        // ISO Date 2023-11-05T18:59:59.000Z
        let startDate = `${today.getFullYear()}-${strMonth}-${strDate}T00:00:00.000Z`;
        let endDate = `${today.getFullYear()}-${strMonth}-${strDate}T23:59:59.000Z`;
        return await LogModel.aggregate([
            {
                $match: {
                    $and: [
                        { 'log_date': { $gte: new Date(startDate) } },
                        { 'log_date': { $lte: new Date(endDate) } },
                        { 'device_id': { $eq: id } },
                    ]
                }
            },
            {
                $project: {
                    label: '$log_date',
                    data: {
                        temperature: '$data.temperature',
                        humidity: '$data.humidity',
                        light: '$data.light',
                        soil: '$data.soil'
                    },
                    id: '${device_id}',
                }
            }
        ])
    }

    public async create(createLog: CreateLogDto): Promise<Log> {
        const createdLog: Log = await LogModel.create(createLog)
        return createdLog
    }
    public update(updateUser: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    public async delete(deleteLog: DeleteLogDto): Promise<{ acknowledged: boolean, deletedCount: number }> {
        return await LogModel.deleteMany({ device_id: deleteLog.device_id })
    }

}