import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan'; 
import { rateLimit } from 'express-rate-limit'
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, API } from '@/common/config'; 
import { logger, stream } from '@/common/utils/logger';
import { dbConnection } from '@/common/database'; 
import { Routes } from './common/interfaces/routes.interface';
import { ErrorMiddleware } from '@/common/middlewares/error.middleware';
import { MqttController } from './mqtt/mqtt.controller';


const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    console.log(this.env, this.port);
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000; 

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes); 
    this.initializeErrorHandling();
    new MqttController()
  }

  public listen() {
    console.log("listen")
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    await dbConnection();
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use('/api', limiter);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use(`${API}/`, route.router);
    });
    this.app.get(`${API}`, (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json({message: 'Hello World', api_version: '1'})
    })
  }
 

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
