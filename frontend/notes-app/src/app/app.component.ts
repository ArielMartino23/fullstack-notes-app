import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">Notas</mat-toolbar>
    <div class="main-container">
      <app-note-list></app-note-list>
    </div>
  `,
  styles: [`
    .main-container {
      padding: 1rem;
    }
  `],
  imports: [MatToolbar]
})
export class AppComponent { }
