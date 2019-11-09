import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BoardService } from 'src/app/services/board.service';
import { IngressService } from 'src/app/services/ingress.service';

@Component({
  selector: 'board-modal-page',
  templateUrl: './selectBoard.html',
})
export class BoardModalPage {

  boardList: any;
  resFromService: any;
  selectedBoard: string;

  @Input() stateId: any;

  constructor(private navP : NavParams
    , public modalController: ModalController
    , private boardService: BoardService
    , private ingressService: IngressService) {
  }
  
  ionViewDidEnter() {
    console.log('state id from previous page : ' , this.stateId);
    this.ingressService.getBoardsFromSelectedState(this.stateId).subscribe((res) => {
      this.resFromService = res;
      console.log('list of boards from server : ' , this.resFromService);
      this.boardList = this.resFromService.response;
    });
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  selectBoard(board: any) {
    this.modalController.dismiss({
      'dismissed': true,
      'selectedBoardId': board.boardId,
      'selectedBoardName': board.boardName
    });
  }
}