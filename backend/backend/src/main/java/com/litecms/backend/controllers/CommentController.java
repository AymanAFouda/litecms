package com.litecms.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.litecms.backend.entity.Comment;
import com.litecms.backend.service.CommentService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/Comment")
public class CommentController {

 private final CommentService CommentService;

    public CommentController( CommentService CommentService) {
        this.CommentService = CommentService;
    }
    @PostMapping
    public Comment create(@RequestBody Comment comment) {
        return CommentService.create(comment);
    }
    @PutMapping("/{id}")
    public Comment update(@PathVariable Long commentId,
                           @RequestBody Comment comment) {
        return CommentService.update(commentId, comment);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        CommentService.delete(commentId);
        return ResponseEntity.noContent().build();
    }

}
