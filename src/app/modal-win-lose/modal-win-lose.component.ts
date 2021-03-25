import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {GameState} from '../minesweeper-grid/game-state-enum';

@Component({
  selector: 'app-modal-win-lose',
  templateUrl: './modal-win-lose.component.html',
  styleUrls: ['./modal-win-lose.component.css']
})
export class ModalWinLoseComponent implements OnInit {

  @Input() gameState: GameState;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClose = new EventEmitter<void>();

  modalText: string;

  constructor() { }

  ngOnInit(): void {
    switch (this.gameState)
    {
      case GameState.LOSE:
        this.modalText = "You have lost :-(";
        break;
      case GameState.WIN:
        this.modalText = "Congrats! You have won!!!!";
        break;
    }
  }

}
