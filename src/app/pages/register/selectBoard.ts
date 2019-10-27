import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'board-modal-page',
  templateUrl: './selectBoard.html',
})
export class BoardModalPage {

  boardList: any;

  selectedBoard: string;

  constructor(private navP : NavParams
    , public modalController: ModalController
    , private boardService: BoardService) {
  }
  
  ionViewDidEnter() {
    this.boardList = this.boardService.getBoardList();
    console.log(this.boardList);
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  selectBoard(board: any) {
    this.modalController.dismiss({
      'dismissed': true,
      'selectedBoardId': board.electricityBoardId,
      'selectedBoardName': board.electricityBoardName
    });
  }
}