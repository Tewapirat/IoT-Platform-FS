import { RequestWithUser } from "@/common/interfaces/auth.interface";
import { IController } from "@/common/interfaces/controller.interface";
import { Response, NextFunction, Request } from "express";
import Container, { Service } from "typedi";
import { Device } from "./interfaces/device.interface";
import { DeviceService } from "./device.service";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import { DeleteDeviceDto } from "./dto/delete-device.dto";


@Service()
export class DeviceController implements IController {

    private service = Container.get(DeviceService)


    public get = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.user._id
            const devices: Device[] = await this.service.findAll(userId)
            res.status(200).json({ message: 'get', data: devices })

        } catch (error) {
            next(error)

        }

    }
    public getById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.user._id
            const deviceId: string = req.params.id
            const device: Device = await this.service.findById(deviceId)
            res.status(200).json({ message: 'getById', data: device })
        } catch (error) {
            next(error)

        }
    }
    public create = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const createDevice: CreateDeviceDto = { ...req.body, userId: req.user._id }
            const result: Device = await this.service.create(createDevice)
            res.status(201).json({ message: 'create', data: result })
        } catch (error) {
            next(error)

        }
    }
    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updateDevice: UpdateDeviceDto = { ...req.body }
            const result: Device = await this.service.update(updateDevice)
            res.status(200).json({ message: 'update', data: result })

        } catch (error) {
            next(error)

        }
    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteDevice: DeleteDeviceDto = { ...req.body }
            const result: Device = await this.service.delete(deleteDevice)
            res.status(200).json({ message: 'delete', data: result })
        } catch (error) {
            next(error)

        }
    }

}