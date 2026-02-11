import { IService } from "@/common/interfaces/service.interface";
import { Log } from "./interfaces/device-log.interface";
import { LogModel } from "./schemas/device-log.schema";
import { Service } from "typedi";
import { CreateLogDto } from "./dto/create-log.dto";
import { DeleteLogDto } from "./dto/delete-log.dto";
import { now } from "mongoose";


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
        let strMonth = `${(today.getUTCMonth() + 1).toString().padStart(2, '0')}`;
        let strDate = `${today.getUTCDate().toString().padStart(2, '0')}`;
        // ISO Date 2023-11-05T18:59:59.000Z
        let startDate = `${today.getUTCFullYear()}-${strMonth}-${strDate}T00:00:00.000Z`;
        let endDate = `${today.getUTCFullYear()}-${strMonth}-${strDate}T23:59:59.000Z`;
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
                    label: {
                        $dateToString: {
                            date: '$log_date',
                            timezone: 'Asia/Bangkok',
                            format: '%Y-%m-%d %H:%M:%S'

                        }
                    },
                    data: {
                        temperature: '$data.temperature',
                        humidity: '$data.humidity',
                        light: '$data.light',
                        soil: '$data.soil'
                    },
                    id: '$device_id',
                }
            }
        ])
    }

    async getLogLast6H(id: string): Promise<Log[]> {
        let end = new Date()
        let start = new Date(end)
        start.setHours(start.getHours() - 6)
        return await LogModel.aggregate([
            {
                $match: {
                    $and: [
                        { 'log_date': { $gte: start } },
                        { 'log_date': { $lte: end } },
                        { 'device_id': { $eq: id } },
                    ]
                }
            },
            {
                $project: {
                    label: {
                        $dateToString: {
                            date: '$log_date',
                            timezone: 'Asia/Bangkok',
                            format: '%Y-%m-%d %H:%M:%S'

                        }
                    },
                    data: {
                        temperature: '$data.temperature',
                        humidity: '$data.humidity',
                        light: '$data.light',
                        soil: '$data.soil'
                    },
                    id: '$device_id',
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