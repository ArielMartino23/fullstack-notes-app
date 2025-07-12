package com.ensolvers.notes.controllers;

import com.ensolvers.notes.models.Note;
import com.ensolvers.notes.services.NoteService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping("/active")
    public List<Note> getAllActiveNotes() {
        return noteService.getAllActiveNotes();
    }

    @GetMapping("/archived")
    public List<Note> getAllArchivedNotes() {
        return noteService.getAllArchivedNotes();
    }

    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return noteService.createNote(note);
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note noteDetails) {
        return noteService.updateNote(id, noteDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/category/{category}")
    public List<Note> getNotesByCategory(@PathVariable String category) {
        return noteService.getNotesByCategory(category);
    }
}