import { App } from '@/app'; 
import { ValidateEnv } from '@/common/utils/validateEnv';  
import { UserRoute } from './user/user.routes';
import { AuthRoute } from './auth/auth.routes';
ValidateEnv();

const routes = [
    new UserRoute(),
    new AuthRoute(),
]


const app = new App(routes);

app.listen();
