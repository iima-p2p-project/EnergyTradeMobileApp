import { Injectable } from '@angular/core';
import { AllState } from 'src/app/models/AllState';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  stateList: AllState[] = [{stateId: 1,
    activeStatus: '',
    createdBy: '',
    createdTs: '',
    softdeleteflag: '',
    stateName: 'Andhra Pradesh',
    syncTs: '',
    updatedBy: '',
    updatedTs: '',
    allUsers: [],
    stateBoardMappings: []}
  
  ,

  {stateId: 2,
    activeStatus: '',
    createdBy: '',
    createdTs: '',
    softdeleteflag: '',
    stateName: 'Telangana',
    syncTs: '',
    updatedBy: '',
    updatedTs: '',
    allUsers: [],
    stateBoardMappings: []}];

  constructor() { }

  getStateList() {
    return this.stateList;
  }
}
