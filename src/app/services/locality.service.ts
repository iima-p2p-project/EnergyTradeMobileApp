import { Injectable } from '@angular/core';
import { AllLocality } from 'src/app/models/AllLocality';

@Injectable({
  providedIn: 'root'
})
export class LocalityService {

  localityList: AllLocality[] = [{localityId: 1,
    activeStatus: '',
    createdBy: '',
    createdTs: '',
    softdeleteflag: '',
    localityName: 'Tarnaka',
    syncTs: '',
    updatedBy: '',
    updatedTs: '',
    allUsers: [],
    stateBoardMappings: []}
  
  ,

  {localityId: 2,
    activeStatus: '',
    createdBy: '',
    createdTs: '',
    softdeleteflag: '',
    localityName: 'Lingampalli',
    syncTs: '',
    updatedBy: '',
    updatedTs: '',
    allUsers: [],
    stateBoardMappings: []}];

  constructor() { }

  getLocalityList() {
    return this.localityList;
  }
}
