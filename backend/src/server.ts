import { App } from '@/app'; 
import { ValidateEnv } from '@/common/utils/validateEnv';  
import { UserRoute } from './user/user.routes';
import { AuthRoute } from './auth/auth.routes';
import { DeviceRoute } from './devices/device.routes';
import { DeviceLogRoute } from './device-log/device-log.route';

ValidateEnv();

const routes = [
    new UserRoute(),
    new AuthRoute(),
    new DeviceRoute(),
    new DeviceLogRoute()

]


const app = new App(routes);

app.listen();
