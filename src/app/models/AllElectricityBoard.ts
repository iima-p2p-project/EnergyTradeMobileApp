import { AllUser } from './AllUser';
import { StateBoardMapping } from './StateBoardMapping';

export class AllElectricityBoard{
    electricityBoardId?: number;
    activeStatus?: any;
    createdBy?: string;
    createdTs?: any;
    electricityBoardName?: string;
    softdeleteflag?: any;
    syncTs?: any;
    updatedBy?: string;
    updatedTs?: any;
    allUsers?: AllUser[];
    stateBoardMappings?: StateBoardMapping[];
}