import { AllOtp } from './AllOtp';
import { AllState } from './AllState';
import { AllElectricityBoard } from './AllElectricityBoard';
import { UserRolesPl } from './UserRolesPl';
import { UserTypePl } from './UserTypePl';

export class AllUser{
    userId?: number;
    activeStatus?: any;
    createdBy?: string;
    createdTs?: any;
    deactivationDate?: any;
    fullName?: string;
    phoneNumber?: string;
    registrationDate?: any;
    softdeleteflag?: any;
    syncTs?: any;
    updatedBy?: string;
    updatedTs?: any;
    allOtps?: AllOtp[];
    allState?: AllState[];
    allElectricityBoard?: AllElectricityBoard[];
    userRolesPl?: UserRolesPl[];
    userTypePl?: UserTypePl[];
}