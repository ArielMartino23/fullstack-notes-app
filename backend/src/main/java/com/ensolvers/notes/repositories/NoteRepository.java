package com.ensolvers.notes.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ensolvers.notes.models.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long>{
    List<Note> findByArchived(Boolean archived);
    List<Note> findByCategoryAndArchived(String category, Boolean archived);
}
