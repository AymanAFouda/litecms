package com.litecms.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.litecms.backend.entity.Comment;
import com.litecms.backend.repositories.CommentRepository;


@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    //create
    public Comment create(Comment comment) {
        return commentRepository.save(comment);
    }
    //update
    public Comment update(Long CommentId, Comment comment) {
        Comment existing = commentRepository.findById(CommentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        existing.setGuestName(comment.getGuestName());
        return commentRepository.save(existing);
    }
    public List<Comment> findAll() {
        return commentRepository.findAll();
    }
    public void delete(Long CommentId) {
        commentRepository.deleteById(CommentId);
    }

}


