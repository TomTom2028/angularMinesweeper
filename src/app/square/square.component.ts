import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit, OnChanges {

  @Input() status: any;
  btnText: string;
  textCol: string;
  bgCol: string;

  constructor() {

  }


  ngOnInit(): void {
    this.btnText = this.status.text;
    this.textCol = this.status.textCol;
    this.bgCol = this.status.bgCol;
  }
  // https://www.sporcle.com/games/patrickstar92/minesweeper_colors/results

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.status.firstChange)
    {
      this.btnText = changes.status.currentValue.text;
      this.textCol = changes.status.currentValue.textCol;
      this.bgCol = changes.status.currentValue.bgCol;
    }

  }


}
