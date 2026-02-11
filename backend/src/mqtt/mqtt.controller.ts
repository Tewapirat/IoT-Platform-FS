import Container, { Service } from "typedi";
import { MqttClient, connect } from "mqtt";
import { MQTT_BROKER, MQTT_PASS, MQTT_USER } from "@/common/config";
import { logger } from "@/common/utils/logger";
import { Device } from "@/devices/interfaces/device.interface";
import { Document } from "mongoose";
import { DeviceModel } from "@/devices/schemas/device.schema";
import { DeviceLogService } from "@/device-log/device-log.service";


@Service()
export class MqttController {
    private client: MqttClient
    private topics = ['test/+/out', 'test/+/checkin', 'test/+/will']

    private logService: DeviceLogService = Container.get(DeviceLogService)

    constructor() {
        this.initMqtt()
    }


    private async initMqtt() {
        this.client = connect(MQTT_BROKER, { username: MQTT_USER, password: MQTT_PASS })
        this.client.on('connect', () => {
            console.log('mqtt client connected')
            this.onConnected()
        })

        this.client.on('error', (e) => {
            console.log('ERROR', e)
        })

        this.client.on('message', (topic, message) => {
            logger.info(`${topic}, ${message.toString()}`)
            this.onMessage(topic, message.toString())
        })

    }


    private onConnected() {
        for (let index = 0; index < this.topics.length; index++) {
            const topic = this.topics[index];
            this.client.subscribe(topic, (error) => {
                if (error) {
                    console.log(`${topic}: error ${error}`)
                } else {
                    console.log(topic)
                }
            })

        }

    }

    private async onMessage(topic: string, message: string) {
        const topics = topic.split('/')
        const payload = JSON.parse(message)
        const device: Device & Document = await DeviceModel.findOne({ id: payload.device_id })
        if (device) {
            if(topics[2] ==='out'){
                device.active_date = new Date()
                if(!device.online_status){
                    device.online_status = true
                }
                if (payload.all){
                    device.data = payload
                    this.logService.create({
                        device_id: payload.device_id,
                        data: payload,
                        log_date: new Date()
                    })
                }
                device.save()
            }
            if (topics[2] === 'checkin') {
                device.online_status = true
                device.save()

            }
            if (topics[2] === 'will') {
                device.online_status = false
                device.save()

            }

        } else {
            console.log(`${payload.device_id}: NOT FOUND`)
        }


    }
}