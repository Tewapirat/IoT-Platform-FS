import { IService } from "@/common/interfaces/service.interface";
import { Service } from "typedi";
import { DeviceModel } from "./schemas/device.schema";
import { Device } from "./interfaces/device.interface";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import { NotFoundException } from "@/common/exceptions/HttpException";
import { Document } from "mongoose";
import { DeleteDeviceDto } from "./dto/delete-device.dto";

@Service()
export class DeviceService implements IService{
    public async findAll(userId: string): Promise<Device[]> {
        return await DeviceModel.find({userId: userId});
    }
    public async findById(id: string): Promise<Device> {
        return await DeviceModel.findById(id)
    }
    public async create(deviceData: CreateDeviceDto): Promise<Device> {
        const device: Device = await DeviceModel.create(deviceData)
        return device
    }
    public async update(deviceData: UpdateDeviceDto): Promise<Device> {
        const findDevice: Device & Document = await DeviceModel.findById(deviceData._id)
        if (!findDevice){
            throw new NotFoundException('Device not found')
        }
        findDevice.id = deviceData.id
        findDevice.name = deviceData.name
        await findDevice.save()
        return findDevice
        
    }
    public  async delete(deleteDevice: DeleteDeviceDto): Promise<Device> {
        const findDevice: Device & Document = await DeviceModel.findById(deleteDevice._id)
        if (!findDevice){
            throw new NotFoundException('Device not found')
        }
        await findDevice.delete()
        return findDevice
    }

}