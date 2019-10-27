export class SellOrderPayload{
    sellerId?: string;
    deviceId?: string;
    powerToSell?: number;
    transferStartTs?: string;
    transferEndTs?: string;
    ratePerUnit?: number;
    totalAmount?: number;
}