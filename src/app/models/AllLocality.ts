import { AllUser } from './AllUser';
import { StateBoardMapping } from './StateBoardMapping';

export class AllLocality{
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