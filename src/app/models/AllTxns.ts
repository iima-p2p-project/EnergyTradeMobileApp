import { IonDatetime } from '@ionic/angular';

export class AllTxns{
    txnId?: any;
    txnType?: string;
    txnDate?: IonDatetime;
    txnAmount?: number;
    particpantName?: string;
}