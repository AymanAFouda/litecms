package com.litecms.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.litecms.backend.entity.Comment;
import com.litecms.backend.service.CommentService;

@RestController
@RequestMapping("/api") 
public class CommentController {

    private final CommentService commentService;

    public CommentController( CommentService commentService) {
        this.commentService = commentService;
    }
    
    //CREATE COMMENT FOR A CONTENT
    @PostMapping("/comments/{contentId}")
    public Comment create(@PathVariable Long contentId, @RequestBody Comment comment) {
        return commentService.create(contentId, comment);
    }
    
    //GET COMMENTS BY CONTENT
    @GetMapping("/comments/content/{contentId}")
    public List<Comment> getCommentsByContent(@PathVariable Long contentId) {
        return commentService.getCommentsByContent(contentId);
    }
}
