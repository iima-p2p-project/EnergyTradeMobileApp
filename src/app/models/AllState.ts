import { AllUser } from './AllUser';
import { StateBoardMapping } from './StateBoardMapping';

export class AllState{
    stateId?: number;
    activeStatus?: any;
    createdBy?: string;
    createdTs?: any;
    softdeleteflag?: any;
    stateName?: string;
    syncTs?: any;
    updatedBy?: string;
    updatedTs?: any;
    allUsers?: AllUser[];
    stateBoardMappings?: StateBoardMapping[];
}