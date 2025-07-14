package com.ensolvers.notes.services;

import com.ensolvers.notes.models.Note;
import com.ensolvers.notes.repositories.NoteRepository;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NoteService {
    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getAllActiveNotes() {
        return noteRepository.findByArchived(false);
    }

    public List<Note> getAllArchivedNotes() {
        return noteRepository.findByArchived(true);
    }

    public Note createNote(Note note) {
        return noteRepository.save(note);
    }

    public Note updateNote(Long id, Note noteDetails) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        
        note.setTitle(noteDetails.getTitle());
        note.setContent(noteDetails.getContent());
        note.setArchived(noteDetails.getArchived());
        note.setCategory(noteDetails.getCategory());
        
        return noteRepository.save(note);
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }

    public List<Note> getNotesByCategory(String category) {
        return noteRepository.findByCategoryAndArchived(category, false);
    }
}
