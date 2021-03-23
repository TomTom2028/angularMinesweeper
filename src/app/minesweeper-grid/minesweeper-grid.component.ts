import {ChangeDetectorRef, Component, Injectable, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Square} from './square';

@Component({
  selector: 'app-minesweeper-grid',
  templateUrl: './minesweeper-grid.component.html',
  styleUrls: ['./minesweeper-grid.component.css']
})



export class MinesweeperGridComponent implements OnInit, OnChanges {

  board: Square[][];

  boardWidth: number;
  boardHeight: number;
  bombsLeft: number;

  @Input() val: any;

  constructor() {
  }

  genBoard(x: number, y: number, numBombs: number): void {
    this.bombsLeft = numBombs;
    // Fill temp array
    let tempArr = new Array(y);
    for (let i = 0; i < tempArr.length; i++)
    {
      tempArr[i] = new Array(x);
      for (let j = 0; j < tempArr[i].length; j++)
      {
        tempArr[i][j] = new Square(i, j);
      }
    }

    if (numBombs > x * y)
    {
      console.log("INVALID AMOUNT OF BOMBS");
      return;
    }
    // Add Bombs
    while (numBombs > 0)
    {
      let tempI = Math.floor(Math.random() * y);
      let tempJ = Math.floor(Math.random() * x);

      if (!tempArr[tempI][tempJ].hasBomb)
      {
        tempArr[tempI][tempJ].hasBomb = true;
        numBombs--;
      }
    }


    this.board = tempArr;
    console.log(this.board);
  }


  ngOnInit(): void {
    this.genBoard(this.val.x, this.val.y, this.val.numBombs);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.val.firstChange)
    {
      this.genBoard(changes.val.currentValue.x, changes.val.currentValue.y, changes.val.currentValue.numBombs);
    }

  }

  squareClicked(clickedSquare): void {
    console.log("clok");
    if (!clickedSquare.isUncovered && !clickedSquare.isFlagged)
    {
      // Valid operation, do now
      clickedSquare.setNumBombs(this.uncoverSquare(clickedSquare));
    }
  }

  private uncoverSquare(currentSquare: Square, isFirstSquare: boolean = true): number
  {
    if (isFirstSquare && currentSquare.hasBomb)
    {
      currentSquare.isUncovered = true;
      return -1; // This means we have hit a bomb.
    }

    // Search all squares arount this square, and see if it is a bomb.
    // First check and corrigate the search bounds.
    let minI = currentSquare.y - 1 < 0 ? 0 : currentSquare.y - 1;
    let maxI = currentSquare.y + 1 > this.board.length - 1 ? this.board.length - 1 : currentSquare.y + 1;

    let minJ = currentSquare.x - 1 < 0 ? 0 : currentSquare.x - 1;
    let maxJ = currentSquare.x + 1 > this.board[0].length - 1 ? this.board[0].length - 1 : currentSquare.x + 1;

    let numOfBombsNearby = 0;
    for (let i = minI; i < maxI + 1; i++)
    {
      for (let j = minJ; j < maxJ + 1; j++)
      {
        if (this.board[i][j].hasBomb)
        {
          numOfBombsNearby++;
        }
      }
    }

    // First set the status of the current square
    currentSquare.isUncovered = true;


    // If there are no bombs around, then we start with uncovering more squares.
    if (numOfBombsNearby === 0)
    {
      for (let i = minI; i < maxI + 1; i++)
      {
        for (let j = minJ; j < maxJ + 1; j++)
        {
          if (!this.board[i][j].isFlagged && !this.board[i][j].isUncovered)
          {
            this.board[i][j].setNumBombs(this.uncoverSquare(this.board[i][j], false));
          }
        }
      }
    }

    // Now return the number
    return numOfBombsNearby;

  }

  squareRightClicked(clickedSquare): boolean {
    if (!clickedSquare.isUncovered)
    {
      // Valid operation, do now
      if (!clickedSquare.isFlagged)
      {
        if (this.bombsLeft > 0)
        {
          clickedSquare.isFlagged = true;
          clickedSquare.displayValue = "F";
          this.bombsLeft--;
        }
      }
      else
      {
        clickedSquare.isFlagged = false;
        clickedSquare.displayValue = "";
        this.bombsLeft++;
      }

    }
    return false;
  }

  // TODO: write console print grid for debugging uncover alg


}
