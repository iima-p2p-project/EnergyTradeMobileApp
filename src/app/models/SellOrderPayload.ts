export class SellOrderPayload{
    sellOrderId?: any;
    sellerId?: any;
    deviceTypeId?: any;
    userDeviceId?: any;
    powerToSell?: number;
    transferStartTs?: string;
    transferEndTs?: string;
    ratePerUnit?: number;
    totalAmount?: number;
    energy?: number;
}