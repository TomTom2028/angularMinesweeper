import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit, OnChanges {

  @Input() text: string;
  btnText: string;

  constructor() {

  }


  ngOnInit(): void {
    this.btnText = this.text;

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.text.firstChange)
    {
      this.btnText = changes.text.currentValue;
    }

  }

}
