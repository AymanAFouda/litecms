package com.litecms.backend.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@EntityListeners(AuditingEntityListener.class)
public class Comment  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private String guestName;

    private String commentText;
   
    @CreatedDate
    @Column(nullable = false, updatable = false) 
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "content_id", nullable = false)
    private Content content;

    public Comment(Long commentId, String guestName, String commentText, LocalDateTime createdAt, Content content) {
        commentId = commentId;
        this.guestName = guestName;
        this.commentText = commentText;
        this.createdAt = createdAt;
        this.content = content;
    }
    public Comment() {}

    //#region Getters and Setters
    public Long getCommentId() {
        return commentId;
    }


    public void setCommentId(Long commentId) {
        commentId = commentId;
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

    public Content getContent() {
    return content;
    }

    public void setContent(Content content) {
        this.content = content;
    }
    //#endregion
}
