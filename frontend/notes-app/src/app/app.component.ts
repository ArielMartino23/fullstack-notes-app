import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoteListComponent } from './components/note-list/note-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, NoteListComponent],
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
    mat-toolbar {
      margin-bottom: 1rem;
    }
  `]
})
export class AppComponent { }