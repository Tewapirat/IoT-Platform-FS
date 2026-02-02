import { config } from 'dotenv'; 
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` }); 
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { DB_HOST, DB_PORT, DB_DATABASE, API } = process.env;
export const { MQTT_BROKER, MQTT_USER, MQTT_PASS, MQTT_CLIENT_ID } = process.env;
