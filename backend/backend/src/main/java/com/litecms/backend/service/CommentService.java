package com.litecms.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.litecms.backend.entity.Comment;
import com.litecms.backend.entity.Content;
import com.litecms.backend.repositories.CommentRepository;
import com.litecms.backend.repositories.ContentRepository;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final ContentRepository contentRepository;

    public CommentService(CommentRepository commentRepository, ContentRepository contentRepository) {
        this.commentRepository = commentRepository;
        this.contentRepository = contentRepository;
    }

   //CREATE COMMENT FOR A CONTENT
    public Comment create(Long contentId, Comment comment) {
        Content content = contentRepository.findById(contentId)
            .orElseThrow(() -> new RuntimeException("Content not found"));

        comment.setContent(content);
        return commentRepository.save(comment);
    }

    //GET COMMENTS BY CONTENT (ORDERED)
    public List<Comment> getCommentsByContent(Long contentId) {
        return commentRepository
            .findByContentContentIdOrderByCreatedAtAsc(contentId);
    }   
}


