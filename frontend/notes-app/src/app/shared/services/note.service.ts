import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Note {
  id?: string;
  title: string;
  content: string;
  completed: boolean;
  archived?: boolean;
  category?: string;
}

@Injectable({ providedIn: 'root' })
export class NoteService {
  constructor(private http: HttpClient) {}

  getActiveNotes(): Observable<Note[]> {
    return this.http.get<Note[]>('/api/notes/active');
  }

  getArchivedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>('/api/notes/archived');
  }

  getNotesByCategory(category: string): Observable<Note[]> {
    return this.http.get<Note[]>(`/api/notes/category/${category}`);
  }

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>('/api/notes', note);
  }

  updateNote(id: string, note: Note): Observable<Note> {
    return this.http.put<Note>(`/api/notes/${id}`, note);
  }

  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`/api/notes/${id}`);
  }
}
