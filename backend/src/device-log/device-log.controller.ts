import { RequestWithUser } from "@/common/interfaces/auth.interface";
import { IController } from "@/common/interfaces/controller.interface";
import { Response, NextFunction, Request } from "express";
import { DeviceLogService } from "./device-log.service";
import Container, { Service } from "typedi";
import { Log } from "./interfaces/device-log.interface";
import { DeleteLogDto } from "./dto/delete-log.dto";


@Service()
export class DeviceLogController implements IController {

    private service: DeviceLogService = Container.get(DeviceLogService)

    public get = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const device_id = req.params.device_id
            const logs: Log[] = await this.service.findAll(device_id)
            res.status(200).json({ message: 'get', data: logs, count: logs.length })

        } catch (error) {
            next(error)

        }
    }
    public getLogCurrent = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const device_id = req.params.device_id
            const logs: Log[] = await this.service.getLogCurrent(device_id)
            res.status(200).json({ message: 'get-log-current', data: logs, count: logs.length })

        } catch (error) {
            next(error)

        }
    }
    public getLogLast6H = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const device_id = req.params.device_id
            const logs: Log[] = await this.service.getLogLast6H(device_id)
            res.status(200).json({ message: 'get-log-6H', data: logs, count: logs.length })

        } catch (error) {
            next(error)

        }
    }

    public getById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            throw new Error("Method not implemented")
        } catch (error) {
            next(error)

        }
    }
    public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            throw new Error("Method not implemented")
        } catch (error) {
            next(error)

        }
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            throw new Error("Method not implemented")
        } catch (error) {
            next(error)

        }
    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteLog: DeleteLogDto = { ...req.body }
            const result = await this.service.delete(deleteLog)
            res.status(200).json({ message: 'delete', data: result })

        } catch (error) {
            next(error)

        }
    }

}