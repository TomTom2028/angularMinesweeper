import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MinesweeperGridComponent } from './minesweeper-grid/minesweeper-grid.component';
import {RouterModule} from '@angular/router';
import { SquareComponent } from './square/square.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MinesweeperGridComponent,
    SquareComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
