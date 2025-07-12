import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
    private apiUrl = `${environment.apiUrl}/api/notes`;

    constructor(private http: HttpClient) {}

    getActiveNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(`${this.apiUrl}/active`);
    }

    getArchivedNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(`${this.apiUrl}/archived`);
    }

    createNote(note: Note): Observable<Note> {
        return this.http.post<Note>(this.apiUrl, note);
    }

    updateNote(id: number, note: Note): Observable<Note> {
        return this.http.put<Note>(`${this.apiUrl}/${id}`, note);
    }

    deleteNote(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getNotesByCategory(category: string): Observable<Note[]> {
        return this.http.get<Note[]>(`${this.apiUrl}/category/${category}`);
    }
}
