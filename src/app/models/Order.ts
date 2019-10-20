import { IonDatetime } from '@ionic/angular';

export class Order{
    orderId?: number;
    orderType?: string;
    deviceName?: string;
    power?: number;
    startTime?: string;
    endTime?: string;
    duration?: number;
    ratePerUnit?: number;
    totalAmount?: number;
    budgerRange?: number;
    softdeleteflag?: any;
    status?: any;
}