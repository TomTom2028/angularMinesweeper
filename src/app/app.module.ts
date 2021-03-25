import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MinesweeperGridComponent } from './minesweeper-grid/minesweeper-grid.component';
import {RouterModule} from '@angular/router';
import { SquareComponent } from './square/square.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ModalWinLoseComponent } from './modal-win-lose/modal-win-lose.component';

@NgModule({
  declarations: [
    AppComponent,
    MinesweeperGridComponent,
    SquareComponent,
    ModalWinLoseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatRippleModule,
    MatRadioModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
