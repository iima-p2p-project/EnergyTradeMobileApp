import { Injectable } from '@angular/core';
import { AllState } from 'src/app/models/AllState';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INGRESS_URL, CONFIG_URL } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  getAllStateUrl = INGRESS_URL + '/getAllState';

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
