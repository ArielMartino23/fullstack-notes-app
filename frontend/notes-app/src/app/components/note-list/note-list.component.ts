import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NoteFormComponent } from '../note-form/note-form.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { NoteService } from 'src/app/services/note.service';

interface Note {
  id?: string;
  title: string;
  content: string;
  completed: boolean;
  archived?: boolean;
  category?: string;
}

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    NoteFormComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  activeNotes: Note[] = [];
  archivedNotes: Note[] = [];
  showArchived = false;
  categories: string[] = [];
  selectedCategory: string | null = null;
  loading = true;

  constructor(
    private noteService: NoteService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.loading = true;

    if (this.selectedCategory) {
      this.noteService.getNotesByCategory(this.selectedCategory).subscribe(notes => {
        this.activeNotes = notes;
        this.loading = false;
      });
    } else {
      this.noteService.getActiveNotes().subscribe(notes => {
        this.activeNotes = notes;
        this.extractCategories(notes);
        this.loading = false;
      });
    }

    this.noteService.getArchivedNotes().subscribe(notes => {
      this.archivedNotes = notes;
      this.extractCategories(notes);
    });
  }

  extractCategories(notes: Note[]): void {
    const allCategories = notes
      .map(note => note.category)
      .filter((category): category is string => !!category);

    this.categories = [...new Set(allCategories)];
  }

  toggleArchiveStatus(note: Note): void {
    const updatedNote = { ...note, archived: !note.archived };
    this.noteService.updateNote(note.id!, updatedNote).subscribe(() => {
      this.loadNotes();
    });
  }

  openNoteForm(note?: Note): void {
    const dialogRef = this.dialog.open(NoteFormComponent, {
      width: '500px',
      data: note ? { ...note } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.noteService.updateNote(result.id, result).subscribe(() => {
            this.loadNotes();
          });
        } else {
          this.noteService.createNote(result).subscribe(() => {
            this.loadNotes();
          });
        }
      }
    });
  }

  confirmDelete(note: Note): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de que deseas eliminar la nota "${note.title}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && note.id) {
        this.noteService.deleteNote(note.id).subscribe(() => {
          this.loadNotes();
        });
      }
    });
  }

  filterByCategory(category: string | null): void {
    this.selectedCategory = category;
    this.loadNotes();
  }

  toggleArchivedView(): void {
    this.showArchived = !this.showArchived;
  }
}
