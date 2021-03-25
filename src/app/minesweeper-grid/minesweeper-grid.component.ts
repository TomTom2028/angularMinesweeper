import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Square} from './square';
import {GameState} from './game-state-enum';

@Component({
  selector: 'app-minesweeper-grid',
  templateUrl: './minesweeper-grid.component.html',
  styleUrls: ['./minesweeper-grid.component.css']
})



export class MinesweeperGridComponent implements OnInit, OnChanges {

  board: Square[][];
  bombsLeft: number;

  allowInput: boolean;


  winLooseDisplayText: string;
  squareSize = 2;

  @Input() val: any;

  @Output() gameConcludedEvent = new EventEmitter<GameState>();

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
        tempArr[i][j] = new Square(j , i); // x and y are reversed
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
    this.allowInput = true;
    this.winLooseDisplayText = "";
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.val.firstChange)
    {
      this.genBoard(changes.val.currentValue.x, changes.val.currentValue.y, changes.val.currentValue.numBombs);
      this.allowInput = true;
      this.winLooseDisplayText = "";
    }

  }

  squareClicked(clickedSquare): void {
    if (clickedSquare.status === Square.SquareStatus.HIDDEN)
    {
      // Valid operation, do now
      this.uncoverSquare(clickedSquare);
      if (clickedSquare.status === Square.SquareStatus.BOMB)
      {
        this.doOnLose();
      }
    }
  }


  private uncoverSquare(currentSquare: Square): void
  {
    if (currentSquare.hasBomb)
    {
      currentSquare.status = Square.SquareStatus.BOMB;
      return;
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

    // First we update the current square
    let newStatus: any;
    function sw(): any {
      switch (numOfBombsNearby)
      {
        case 0: return Square.SquareStatus.EMPTY;
        case 1: return Square.SquareStatus.NEARBY1;
        case 2: return Square.SquareStatus.NEARBY2;
        case 3: return Square.SquareStatus.NEARBY3;
        case 4: return Square.SquareStatus.NEARBY4;
        case 5: return Square.SquareStatus.NEARBY5;
        case 6: return Square.SquareStatus.NEARBY6;
        case 7: return Square.SquareStatus.NEARBY7;
        case 8: return Square.SquareStatus.NEARBY8;
      }
      throw Error("Code fucked up, there can't be more than 8 bombs around");
    }

    currentSquare.status = sw();




    // If there are no bombs around, then we start with uncovering more squares.
    if (numOfBombsNearby === 0)
    {
      for (let i = minI; i < maxI + 1; i++)
      {
        for (let j = minJ; j < maxJ + 1; j++)
        {
          if (this.board[i][j].status === Square.SquareStatus.HIDDEN)
          {
            this.uncoverSquare(this.board[i][j]);
          }
        }
      }
    }
  }

  squareRightClicked(clickedSquare): boolean {
    if (!this.allowInput) {
      return false;
    }

    if (clickedSquare.status === Square.SquareStatus.FLAGGED)
    {
      clickedSquare.status = Square.SquareStatus.HIDDEN;
      this.bombsLeft++;
    }
    else
    {
      if (clickedSquare.status === Square.SquareStatus.HIDDEN && this.bombsLeft > 0)
      {
        clickedSquare.status = Square.SquareStatus.FLAGGED;
        this.bombsLeft --;

        // here we can check if the player has won.

        if (this.hasPlayerWon())
        {
          this.doOnWin();
        }

      }
    }

    return false;
  }


  private doOnWin(): void
  {
    this.allowInput = false;
    this.winLooseDisplayText = "You have won! Congrats!";
    this.gameConcludedEvent.emit(GameState.WIN);

  }

  private doOnLose(): void
  {
    this.allowInput = false;
    this.winLooseDisplayText = "You lost...";

    // now we uncover all the squares.

    this.board.forEach((row) => {
      row.forEach(square => {
        this.uncoverSquare(square);
      });
    });

    this.gameConcludedEvent.emit(GameState.LOSE);

  }


  hasPlayerWon(): boolean
  {
    let numOfCorrectFlags = 0;

    this.board.forEach((row) => {
      row.forEach(square => {
        if (square.hasBomb && square.status === Square.SquareStatus.FLAGGED)
        {
          numOfCorrectFlags++;
        }
      });
    });

// OLD
/*    for (let i = 0; i < this.board.length; i++)
    {
      for (let j = 0; j < this.board[i].length; j++)
      {
        if (this.board[i][j].hasBomb && this.board[i][j].status === Square.SquareStatus.FLAGGED)
        {
          numOfCorrectFlags++;
        }
      }
    }

 */

    return numOfCorrectFlags >= this.val.numBombs;

  }

  printGrid(): void
  {
    let outStr = "";
    for (let i = 0; i < this.board.length; i++)
    {
      for (let j = 0; j < this.board[i].length; j++)
      {
        outStr += this.board[i][j].status.text + " ";
      }
      outStr += '\n';
    }

    console.log(outStr);
  }


}
