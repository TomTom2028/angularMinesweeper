export class Square {

  static coveredCol = "gray";
  static revealedCol = "white";

  static SquareStatus = Object.freeze({
    HIDDEN: {text: "", textCol: "gray", bgCol: Square.coveredCol},
    EMPTY: {text: "", textCol: "gray", bgCol: Square.revealedCol},
    NEARBY1: {text: "1", textCol: "blue", bgCol: Square.revealedCol},
    NEARBY2: {text: "2", textCol: "green", bgCol: Square.revealedCol},
    NEARBY3: {text: "3", textCol: "red", bgCol: Square.revealedCol},
    NEARBY4: {text: "4", textCol: "purple", bgCol: Square.revealedCol},
    NEARBY5: {text: "5", textCol: "maroon", bgCol: Square.revealedCol},
    NEARBY6: {text: "6", textCol: "turquoise", bgCol: Square.revealedCol},
    NEARBY7: {text: "7", textCol: "black", bgCol: Square.revealedCol},
    NEARBY8: {text: "8", textCol: "gray", bgCol: Square.revealedCol},
    BOMB: {text: "B", textCol: "black", bgCol: "red"},
    FLAGGED: {text: "F", textCol: "BLACK", bgCol: Square.coveredCol}
      });

  status = Square.SquareStatus.HIDDEN;


  hasBomb: boolean;
  x: number;
  y: number;


  constructor(x: number, y: number, hasBomb: boolean = false) {
    this.hasBomb = hasBomb;
    this.x = x;
    this.y = y;
  }


}
