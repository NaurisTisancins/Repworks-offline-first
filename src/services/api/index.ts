import { createClient } from './service';
import Constants from 'expo-constants';

export * from './common';
export * from './routeConfig';

const homeIp = 'http://192.168.0.2:8000/api/v1';
const vaIp = 'http://10.13.15.77:8000/api/v1';
const localHost = 'http://127.0.0.1:8000/api/v1';
const iphoneHotspon = 'http://192.0.0.2:8000/api/v1';
const shuttle = 'https://nauristisancins.shuttleapp.rs/api/v1';

const uri = Constants?.expoConfig?.hostUri
    ? `http://${Constants?.expoConfig?.hostUri.split(':').shift()}:8000/api/v1`
    : homeIp;

export const mainClient = createClient(localHost);
