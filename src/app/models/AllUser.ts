import { AllOtp } from './AllOtp';
import { AllState } from './AllState';
import { AllElectricityBoard } from './AllElectricityBoard';
import { UserRolesPl } from './UserRolesPl';
import { UserTypePl } from './UserTypePl';

export class AllUser {
    userId?: number;
    userName?: string;
    usn?: string;
    localityName?: string;
    activeStatus?: any;
    createdBy?: string;
    createdTs?: any;
    deactivationDate?: any;
    phoneNumber?: string;
    registrationDate?: any;
    softdeleteflag?: any;
    syncTs?: any;
    updatedBy?: string;
    updatedTs?: any;
    stateId?: any;
    boardId?: any;
    userRole?: string;
    userTypes?: string[];
    localityId?: any;
    drContractNumber?: any;
}