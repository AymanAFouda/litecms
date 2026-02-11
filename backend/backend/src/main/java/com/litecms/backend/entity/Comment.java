package com.litecms.backend.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Comment  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long CommentId;

    private String guestName;

    private String commentText;
   
    @CreatedDate
    @Column(nullable = false, updatable = false) 
    private LocalDateTime createdAt = LocalDateTime.now();

    public Comment(Long commentId, String guestName, String commentText, LocalDateTime createdAt) {
        CommentId = commentId;
        this.guestName = guestName;
        this.commentText = commentText;
        this.createdAt = createdAt;
    }

    //#region Getters and Setters
    public Long getCommentId() {
        return CommentId;
    }


    public void setCommentId(Long commentId) {
        CommentId = commentId;
    }


    public String getGuestName() {
        return guestName;
    }


    public void setGuestName(String guestName) {
        this.guestName = guestName;
    }


    public String getCommentText() {
        return commentText;
    }


    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    //#endregion
}
