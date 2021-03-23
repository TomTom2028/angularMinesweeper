import {Subject} from 'rxjs';

export class Square {
  displayValue = "";
  hasBomb: boolean;
  isUncovered = false;
  isFlagged = false;
  x: number;
  y: number;


  constructor(x: number, y: number, hasBomb: boolean = false) {
    this.hasBomb = hasBomb;
    this.x = x;
    this.y = y;
  }

  setFlagged(status: boolean): void
  {
    this.isFlagged = status;
    if (status)
    {
      this.displayValue = "F";
    }
    else
    {
      this.displayValue = "";
    }
  }

  setNumBombs(numBombs: number): void
  {
    // -1 : is bomb
    if (numBombs === -1)
    {
      this.displayValue = "B";
    }
    else
    {
      this.displayValue = String(numBombs);
    }
  }

}
