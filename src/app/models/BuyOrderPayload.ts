export class BuyOrderPayload{
    userId?: any;
    deviceTypeId?: any;
    minUnits?: number;
    maxUnits?: number;
    transferStartTs?: string;
    transferEndTs?: string;
    minAmount?: number;
    maxAmount?: number;
}