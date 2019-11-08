import { AllUser } from './AllUser';
import { StateBoardMapping } from './StateBoardMapping';

export class AllState{
    localityId?: number;
    activeStatus?: any;
    createdBy?: string;
    createdTs?: any;
    softdeleteflag?: any;
    localityName?: string;
    syncTs?: any;
    updatedBy?: string;
    updatedTs?: any;
    allUsers?: AllUser[];
    stateBoardMappings?: StateBoardMapping[];
}