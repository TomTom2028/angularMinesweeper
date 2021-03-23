import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularMinesweeper';

  difficultyForm = this.formBuilder.group({
    difficulty: ['', Validators.required]
  });

  grid = {x: 0, y: 0, numBombs: 0};

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  onSubmit(): void {
    switch (this.difficultyForm.value.difficulty)
    {
      case "Easy": this.grid = {x: 8, y: 8, numBombs: 10};
        break;
      case "Medium": this.grid = {x: 16, y: 16, numBombs: 40};
        break;
      case "Hard": this.grid = {x: 16, y: 30, numBombs: 99};

    }
  }

  ngOnInit(): void {

  }
}
