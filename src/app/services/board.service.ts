import { Injectable } from '@angular/core';
import { AllElectricityBoard } from 'src/app/models/AllElectricityBoard';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  boardList: AllElectricityBoard[] = [{electricityBoardId: 1,
    activeStatus: '',
    createdBy: '',
    createdTs: '',
    electricityBoardName: 'CESS Ltd, Sircilla',
    softdeleteflag: '',
    syncTs: '',
    updatedBy: '',
    updatedTs: '',
    allUsers: [],
    stateBoardMappings: []}
  
  ,

  { electricityBoardId: 2,
    activeStatus: '',
    createdBy: '',
    createdTs: '',
    electricityBoardName: 'TSSPDCL',
    softdeleteflag: '',
    syncTs: '',
    updatedBy: '',
    updatedTs: '',
    allUsers: [],
    stateBoardMappings: []}];

  constructor() { }

  getBoardList() {
    return this.boardList;
  }
}
