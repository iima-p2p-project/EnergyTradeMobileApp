export class SellOrderPayload{
    sellerId?: any;
    deviceTypeId?: any;
    userDeviceId?: any;
    powerToSell?: number;
    transferStartTs?: string;
    transferEndTs?: string;
    ratePerUnit?: number;
    totalAmount?: number;
}